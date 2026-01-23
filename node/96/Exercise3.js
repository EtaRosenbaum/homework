const fs = require('fs');
//import fs from 'node:fs';

const fileContents = fs.readFileSync(process.argv[2], 'utf-8');
const lines  = fileContents.split('\n').length -1;
console.log(lines);

