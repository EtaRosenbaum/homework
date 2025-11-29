import './hw83.css'
import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import greet, { add, square } from './hw83.js';

import dayjs from 'dayjs';

const now = dayjs();


console.log('30+50 is', add(30, 50));

console.log('30 squared is', square(30));
console.log(greet('The Programer'));

document.querySelector('#app').innerHTML = `
<h1>${greet('Programer')}</h1>
<h1> The current date and time: ${now.format('dddd, MMMM D, YYYY h:mm:ss A')}</h1>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
