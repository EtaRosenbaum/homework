'use strict';

const http = require('http');
const bl = require('bl');


http.get(process.argv[2], response => {

    response.pipe(bl((error, data) => {
        if (error) {
            console.log(error);
        }
        console.log(data.length);
        console.log(data.toString());

    }));
}).on('error', e => console.error('oops', e));

