(function () {
    'use strict';

    //window.app.counter
    window.app.counter.increment();
    window.app.counter.increment();
    window.app.counter.increment();
    window.app.counter.increment();
    window.app.counter.increment();
    window.app.counter.increment();
    window.app.counter.increment();
    window.app.counter.increment();
    window.app.counter.increment();
    window.app.counter.increment();


    //myCounter
    const myCounter = window.app.createCounter();
    myCounter.increment();
    myCounter.increment();
    myCounter.increment();
    myCounter.increment();
    myCounter.increment();



    //aCounter
    const aCounter = window.app.createCounter();
    aCounter.increment();
    aCounter.increment();
    aCounter.increment();
    aCounter.increment();
    aCounter.increment();
    aCounter.increment();
    aCounter.increment();
    aCounter.increment();
    aCounter.increment();
    aCounter.increment();
    aCounter.increment();
    aCounter.increment();
    aCounter.increment();
    aCounter.increment();
    aCounter.increment();


    //console.log

    console.log('window.app.counter');
    window.app.counter.getCounter();

    console.log('my counter');
    myCounter.getCounter();


    console.log('A Counter');
    aCounter.getCounter();


    //how many counters
    console.log('How Many Counters');
    myCounter.getCount();
}());
