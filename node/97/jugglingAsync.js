'use strict';
const http = require('http');
const bl = require('bl');

const results = [];
let count = 0;

function getData(url, index) {
    http.get(url, response => {

        response.pipe(bl((error, data) => {
            if (error) {
                return console.error('oops2', error);
            }

            results[index] = data.toString();
            count++;

            if (count === process.argv.length - 2) {
            results.forEach(r => console.log(r));
        }


        }));
}).on('error', error => console.error('oops', error));

};

for (let i = 2; i < process.argv.length; i++) {
    getData(process.argv[i], i - 2);
}
