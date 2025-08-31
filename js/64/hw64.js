'use strict';

//1

const dayOfWeek = (function () {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return {
        getDayName(index) {
            return days[index - 1];
        },
        getDayNumber(day) {
            return days.findIndex(d => d === day) + 1;
        }
    };
}());
console.log(dayOfWeek.getDayName(3));
console.log(dayOfWeek.getIndex('Friday'));


//2


const interestCalculator = (function (rate = 0, years = 0) {
    return {


        getRate() {
            return rate;
        },
        setRate(r) {
            rate = r;
            return this;
        },
        getYears() {
            return years;
        },
        setYears(y) {
            years = y;
            return this;
        }
        ,

        calculateInterest(principal) {
            const total = (principal * rate * years) / 100;
            return total;
        }
    };
});

console.log(interestCalculator.calculateInterest(1000));

console.log(interestCalculator.setRate(5).setYears(2).calculateInterest(1000));