'use strict';

//a
function toFahrenheit(x) {
    return (x *9/5)+32;
}
function toCelsius(y){
return (y-32)*5/9;
}

let x = prompt('Enter a temperature in Celsius');
if (x !== null && x !== '') {
    x = parseFloat(x);
    if (!isNaN(x)) {
        let fahrenheit = toFahrenheit(x);
        console.log(`${x}°C is ${fahrenheit}°F`);
    } else {
        console.log("Invalid input. Please enter a number.");
    }
}
let y = prompt("Enter temperature in Fahrenheit:");
if (y !== null && y !== '') {
    y = parseFloat(y);
    if (!isNaN(y)) {
        let celcius = toCelsius(y);
        console.log(`${y}°F is ${celcius}°C`);
    } else {
        console.log("Invalid input. Please enter a number.");
    }
}
alert(`${x}°C to ${toFahrenheit(x)}°F and ${y}°F to ${toCelsius(y)}°C.`);

//b-1
function multiply(a, b) {
    return a * b;
}
console.log(multiply(5, 10));
console.log(multiply(8, 9));
console.log(multiply(1, 325));
console.log(multiply(56, 2));


//b-2
function getMultiplier() {
    return function (a, b) {
        return a * b;
    };
}
let multiplier = getMultiplier();
console.log(multiplier(1, 5));
console.log(multiplier(2, 10));
console.log(multiplier(3, 15));
console.log(multiplier(4, 20));


//b-3
function getMultiplierThree(a) {
    return function (b) {
        return a * b;
    };
}
let multiplyfive = getMultiplierThree(5);
console.log(multiplyfive(2));
let multiplysix = getMultiplierThree(6);
console.log(multiplysix(2));



