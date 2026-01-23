//import fs from 'fs'
const fs = require('fs');
//import path from 'path';
const path  = require('path');
const dir =  process.argv[2];
const ext = '.' + process.argv[3];

fs.readdir(dir, (err, list) => {
    if (err) {
        return console.error(err);
    }

    list.forEach(file => {
        if(path.extname(file) === ext ){
            console.log(file);
        }
    });

});


