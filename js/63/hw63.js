'use strict';

const letters = ['a', 'b', 'c', 'd', 'e'];
const lettersUppercase = ['a', 'B', 'c', 'D', 'e'];
const lettersAllUppercase = ['A', 'B', 'C', 'D', 'E'];




function upperCase(letter) {
    if (letter === letter.toUpperCase()) {
        return true;
    }
    else {
        return false;
    }
}

function lowerCase(letter) {
    if (letter === letter.toLowerCase()) {
        return true;
    }
    else {
        return false;
    }
}

function allOfThem(array, testCallback) {
    for (let i = 0; i < array.length; i++) {
        if (!testCallback(array[i])) {
            return false;
        }

    }
    return true;

}


console.log(allOfThem(letters, lowerCase));

console.log(allOfThem(lettersUppercase, upperCase));
console.log('hello');

console.log(letters.every(lowerCase));
console.log(letters.every(upperCase));



//2:
function someOfThem(array, testCallback) {
    for (let i = 0; i < array.length; i++) {
        if (testCallback(array[i])) {
            return true;
        }
    }
    return false;
}


console.log('\n\n\n');

console.log(someOfThem(lettersAllUppercase, upperCase));
console.log(someOfThem(lettersUppercase, upperCase));

console.log(letters.some(lowerCase));

//3:
function onlyIf(array, testCallback, callback) {
    for (let i = 0; i < array.length; i++) {
        if (testCallback[i]) {
            callback(array[i]);
        }
    }
}


console.log('\n\n\n');
onlyIf(letters, lowerCase, console.log);
onlyIf(lettersUppercase, upperCase, console.log);


//4:


letters.filter(lowerCase).forEach(console.log);

letters.filter(upperCase).forEach(console.log);