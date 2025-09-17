window.pcs = function (selector) {
  'use strict';

  function getElement(selector) {
    return document.querySelector(selector);
  }

  function setCss(element, property, value) {
    //console.log('in setCss', property);
    element.style[property] = value;
  }

  function getCss(element, property) {
    //return element.style[property];
    return getComputedStyle(element)[property];
  }

  function on(element, event, callback) {
    element.addEventListener(event, callback);
  }

  const element = getElement(selector);



  function hide() {
    element.style.display = 'none';
  }


  function show() {
    element.style.display = 'inline-block';
  }




  function getColorPart() {
    return Math.floor(Math.random() * 256);
  }

  function pickRandomColor() {
    const r = getColorPart();
    const g = getColorPart();
    const b = getColorPart();
    console.log(`rgb(${r}, ${g}, ${b})`);
    return `rgb(${r}, ${g}, ${b})`;
  }



  function sparkle(intervalAmnt, time) {
    let count = 0;


    if (intervalAmnt) {
      let interval = setInterval(() => {
        element.style.color = pickRandomColor();
        count++;
        if (count > time) {
          clearInterval(interval);
        }
      }, intervalAmnt);
    }

  }



  return {
    // getElement: getElement,
    /*setCss,
    getCss,*/
    css: function (property, value) {
      if (arguments.length === 1) {
        return getCss(element, property);
      } else {
        return setCss(element, property, value);
      }
    },
    on: (event, callback) => {
      on(element, event, callback);
    },
    click: (callback) => on(element, 'click', callback),
    hide,
    show,
    sparkle: (interval, time) => sparkle(interval, time)

  };
};
