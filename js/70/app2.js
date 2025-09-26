
window.app = window.app || {};


window.app.createCounter = (function () {
let numOfCounters = 0;
    return function createCounter() {

        let count = 0;
        function getNumCount() {
            numOfCounters++;
        }
        getNumCount();

        return {
            count,
            getCounter() {
                console.log(count);
            },
            increment() {
                count++;
            },
            getCount() {
                console.log(numOfCounters);
            }


        };
    };


}());

