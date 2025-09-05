(function(){
'use strict';

let buttonClicks = 2;

document.querySelector('#button1').addEventListener('click',function(e){

    e.target.textContent = 1;

    createNewButton();
} );

function createNewButton(){
    const newButton = document.createElement('button');
    document.body.appendChild(newButton);
    newButton.textContent = buttonClicks++;

  newButton.addEventListener('click', ()=>{
    createNewButton();
  });

}

}());