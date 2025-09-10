(function () {
  'use strict';


  let interval;
  const startButton = document.querySelector('#start');

  let increment =20;


  const colorTable = document.querySelector('#colorTable');
  const now = new Date();
  console.log(now.toLocaleString());


  function start() {
    let r = 0;
    let g = 0;
    let b = 0;

    interval = setInterval(() => {


      if ((r += increment) >= 256) {
        r = 0;

        if ((g += increment) >= 256) {
          g = 0;

          if ((b += increment) >= 256) {
            b = 0;
          }
        }
      }

      document.body.style.color = `rgb(${r}, ${g}, ${b})`;
      document.body.style.backgroundColor = `rgb(${b}, ${g}, ${r})`;


      const row = colorTable.insertRow();
      row.innerText = (`${r}, ${g}, ${b}`);
      console.log(`${r}, ${g}, ${b}`);


      startButton.innerText = 'stop';

    }, 100);
  }

  colorTable.addEventListener('click', ()=>{
    console.log('table was clicked');
  });

  function stop() {
    clearInterval(interval);
    interval = null;

    startButton.innerText = 'start';
  }


  startButton.addEventListener('click', () => {
    if (!interval) {
      start();
    } else {
      stop();
    }
  });
}());
