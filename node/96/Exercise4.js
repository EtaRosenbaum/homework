const fs = require('fs');
//import fs from 'node:fs';

fs.readFile(process.argv[2], (err, result) => {
    if (err) {
        return console.error(err);
    }
    const fileContents = (result.toString());
    const lines = fileContents.split('\n').length - 1;
    console.log(lines);
});
