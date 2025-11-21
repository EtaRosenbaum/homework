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
  class Snake {
    constructor(size) {
      this.size = size;
      this.x = 0;
      this.y = 0;
      this.direction = 'ArrowRight';
      this.body = [{ x: this.x, y: this.y }];
    }

    move() {
      switch (this.direction) {
        case 'ArrowRight': this.x += this.size; break;
        case 'ArrowLeft': this.x -= this.size; break;
        case 'ArrowUp': this.y -= this.size; break;
        case 'ArrowDown': this.y += this.size; break;
      }
    }


    draw(context, image) {
      context.drawImage(image, this.x, this.y);
    }

  }


  class Apple {
    constructor(size, canvasWidth, canvasHeight) {
      this.size = size;
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.x = Math.floor(Math.random() * (this.canvasWidth / this.size)) * this.size;
      this.y = Math.floor(Math.random() * (this.canvasHeight / this.size)) * this.size;
    }
    draw(context, image) {
      context.drawImage(image, this.x, this.y, 64, 64);
    }

  }
  function resizeCanvas() {
    theCanvas.width = window.innerWidth - (window.innerWidth % SNAKE_SIZE);
    theCanvas.height = window.innerHeight - (window.innerHeight % SNAKE_SIZE);
  }

  window.addEventListener('resize', resizeCanvas);

  resizeCanvas();

  let audioPlayed = false;



  function playGame() {
    const snakeHead = document.createElement('img');
    snakeHead.src = 'snakeHead.png';

    const appleImg = document.createElement('img');
    appleImg.src = 'apple.png';

    snake = new Snake(SNAKE_SIZE);
    apple = new Apple(SNAKE_SIZE, theCanvas.width, theCanvas.height);

    document.addEventListener('keydown', e => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'ArrowDown':
          snake.direction = e.key;
          break;
      }
    });

    snakeHead.onload = () => {
      if (newInterval) clearInterval(newInterval);
      newInterval = setInterval(gameLoop, speed);
    };

    function gameLoop() {
      context.clearRect(0, 0, theCanvas.width, theCanvas.height);

      snake.move();
      apple.draw(context, appleImg);
      snake.draw(context, snakeHead);

      if (snake.x === apple.x && snake.y === apple.y) {
        apple = new Apple(SNAKE_SIZE, theCanvas.width, theCanvas.height);
        eat.play();
        score++;
        document.getElementById('sc').innerText = score;

        speed = Math.max(150, speed - 150);
        clearInterval(newInterval);
        newInterval = setInterval(gameLoop, speed);
      }

      yourOut(snake);
    }
  }
  startButton.addEventListener('click', () => {
    start.style.display = 'none';
    playGame();
  });


  function yourOut(snake) {
    if (snake.x < 0 || snake.x >= theCanvas.width || snake.y < 0 || snake.y >= theCanvas.height) {
      clearInterval(newInterval);
      document.querySelector('.endScore').innerText = score;
      document.getElementById('endGameMessage').style.display = 'block';

      if (!audioPlayed) {
        out.play();
        audioPlayed = true;
      }
    }
  }

  document.getElementById('restartButton').addEventListener('click', () => {
    document.getElementById('endGameMessage').style.display = 'none';
    snake.x = 0;
    snake.y = 0;
    snake.direction = 'ArrowRight';
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

  });

}());

