(function () {
  'use strict';

  const SNAKE_SIZE = 64;
  const out = new Audio('lost.wav');
  const eat = new Audio('eatApple.wav');
  let snake;
  let apple;
  let newInterval;
  let score = 0;
  let speed = 1000;

  const theCanvas = document.querySelector('#theCanvas');
  const context = theCanvas.getContext('2d');
  const closeEndGame = document.querySelector('#closeEndGame');
  const startButton = document.getElementById('startButton');
  const start = document.getElementById('start');
  const gameEndedMsg = document.getElementById('endGameMessage');
  const endedGame = document.getElementById('endedGame');






  function drawRoundedRect(ctx, x, y, width, height, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
  }




  class Snake {
    constructor(size) {
      this.size = size;
      this.direction = 'ArrowRight';
      this.body = [{ x: 0, y: 0 }];
    }

    get head() {
      return this.body[0];
    }

    move() {
      let newX = this.head.x;
      let newY = this.head.y;

      switch (this.direction) {
        case 'ArrowRight': newX += this.size; break;
        case 'ArrowLeft': newX -= this.size; break;
        case 'ArrowUp': newY -= this.size; break;
        case 'ArrowDown': newY += this.size; break;
      }

      this.body.unshift({ x: newX, y: newY });
      this.body.pop();
    }

    grow() {
      const tail = this.body[this.body.length - 1];
      let newPart;

      if (this.direction === 'ArrowUp') {
        newPart = { x: tail.x, y: tail.y + this.size };

      } else if (this.direction === 'ArrowDown') {
        newPart = { x: tail.x, y: tail.y - this.size };

      } else if (this.direction === 'ArrowLeft') {
        newPart = { x: tail.x + this.size, y: tail.y };

      } else if (this.direction === 'ArrowRight') {
        newPart = { x: tail.x - this.size, y: tail.y };

      }
      this.body.push(newPart);
    }

    draw(context, headImg) {

      context.save();
      context.translate(this.head.x + this.size / 2, this.head.y + this.size / 2);

      switch (this.direction) {
        case 'ArrowRight':
          context.rotate(-Math.PI / 2);
          break;
        case 'ArrowLeft':
          context.rotate(Math.PI / 2);
          break;
        case 'ArrowUp':
          context.rotate(Math.PI);
          break;
        case 'ArrowDown':
          context.rotate(0);
          break;
      }

      context.drawImage(headImg, -this.size / 2, -this.size / 2, this.size, this.size);

      context.restore();

      for (let i = 1; i < this.body.length; i++) {
        drawRoundedRect(context, this.body[i].x, this.body[i].y, this.size, this.size, 10, 'rgb(204, 219, 56)');
      }
    }

  }

  class Apple {
    constructor(size, canvasWidth, canvasHeight, snakeBody) {
      this.size = size;
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.move(snakeBody);
    }

    move(snakeBody) {
      let valid = false;

      while (!valid) {
        this.x = Math.floor(Math.random() * (this.canvasWidth / this.size)) * this.size;
        this.y = Math.floor(Math.random() * (this.canvasHeight / this.size)) * this.size;

        valid = !snakeBody.some(s => s.x === this.x && s.y === this.y);
      }
    }

    draw(context, img) {
      context.drawImage(img, this.x, this.y, this.size, this.size);
    }
  }

  function resizeCanvas() {
    theCanvas.width = window.innerWidth - (window.innerWidth % SNAKE_SIZE);
    theCanvas.height = window.innerHeight - (window.innerHeight % SNAKE_SIZE);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  let snakeHeadImg, appleImg;
  let audioPlayed = false;

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  }

  async function playGame() {
    snakeHeadImg = await loadImage('green.png');
    appleImg = await loadImage('apple.png');

    snake = new Snake(SNAKE_SIZE);
    apple = new Apple(SNAKE_SIZE, theCanvas.width, theCanvas.height, snake.body);

    document.addEventListener('keydown', e => {
      const opposite = {
        ArrowRight: 'ArrowLeft',
        ArrowLeft: 'ArrowRight',
        ArrowUp: 'ArrowDown',
        ArrowDown: 'ArrowUp'
      };

      if (e.key.startsWith('Arrow') && snake.direction !== opposite[e.key]) {
        snake.direction = e.key;
      }
    });

    if (newInterval) clearInterval(newInterval);
    newInterval = setInterval(gameLoop, speed);
  }

  function gameLoop() {
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);

    snake.move();

    if (
      snake.head.x < 0 ||
      snake.head.x >= theCanvas.width ||
      snake.head.y < 0 ||
      snake.head.y >= theCanvas.height
    ) {
      yourOut();
      return;
    }

    for (let i = 1; i < snake.body.length; i++) {
      if (snake.head.x === snake.body[i].x && snake.head.y === snake.body[i].y) {
        yourOut();
        return;
      }
    }

    if (snake.head.x === apple.x && snake.head.y === apple.y) {
      eat.play();
      score++;
      document.getElementById('sc').innerText = score;

      snake.grow();
      apple.move(snake.body);

      speed = Math.floor(speed * 0.9); if (speed < 80) speed = 80;
      clearInterval(newInterval);
      newInterval = setInterval(gameLoop, speed);

    }

    apple.draw(context, appleImg);
    snake.draw(context, snakeHeadImg);
  }

  function yourOut() {
    clearInterval(newInterval);
    document.querySelector('.endScore').innerText = score;
    document.getElementById('endGameMessage').style.display = 'block';

    if (!audioPlayed) {
      out.play();
      audioPlayed = true;
    }
  }

  startButton.addEventListener('click', () => {
    start.style.display = 'none';
    playGame();
  });

  document.getElementById('restartButton').addEventListener('click', () => {
    document.getElementById('endGameMessage').style.display = 'none';
    audioPlayed = false;

    score = 0;
    document.getElementById('sc').innerText = score;
    speed = 1000;

    playGame();
  });

  document.getElementById('end').addEventListener('click', () => {
    gameEndedMsg.style.display = 'none';
    endedGame.style.display = 'block';
  });

  closeEndGame.addEventListener('click', () => {
    start.style.display = 'block';
    endedGame.style.display = 'none';
    audioPlayed = false;
    score = 0;
    document.getElementById('sc').innerText = score;

  });

}());