window.app = window.app || {};

window.app.counter = (function () {
    'use strict';

    let count = 0;


    return {
        increment: function () {
            count++;
        },
        getCounter: function () {
            console.log(count);
        }
    };


}());