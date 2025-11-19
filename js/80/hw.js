(function () {
    'use strict';

    const theCanvas = document.querySelector('#theCanvas');
    const context = theCanvas.getContext('2d');
    const addBallBtn = document.querySelector('#addBallBtn');
    const colorInput = document.querySelector('#colorInput');
    const radiusInput = document.querySelector('#radiusInput');


    const balls = [];

    function resizeCanvas() {
        theCanvas.width = window.innerWidth;
        theCanvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();



    const gravity = 0.2;
    const BOUNCE = 0.9;




    setInterval(() => {
        context.clearRect(0, 0, theCanvas.width, theCanvas.height);



        balls.forEach(ball => {
            ball.update(theCanvas);
            ball.draw(context);
        });


    }, 5);

    addBallBtn.addEventListener('click', () => {

        const radius = Number(radiusInput.value);
        const color = colorInput.value;



        let dx = (Math.random() * 6) - 3;
        let dy = (Math.random() * 4) - 2;

        const x = radius + 1;
        const y = radius + 1;

        const ball = new Ball(x, y, dx, dy, color, radius);

        balls.push(ball);
    });

    class Ball {
        constructor(x, y, dx, dy, color, radius) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.color = color;
            this.radius = radius;
        }

        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        update(canvas) {

            this.dy += gravity;

            this.x += this.dx;
            this.y += this.dy;


            if (this.x < this.radius || this.x > canvas.width - this.radius) {
                this.dx *= -1;
            }
            if (this.y > canvas.height - this.radius) {
                this.y = canvas.height - this.radius;

                this.dy *= -BOUNCE;

            }
        }
    }
    console.log(Ball);

}());
