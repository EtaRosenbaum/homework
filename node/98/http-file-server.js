const http= require('http');
const fs = require('fs');

http.createServer((req, res)=>{

const readStream = fs.createReadStream(process.argv[3]);

readStream.pipe(res);

}).listen(process.argv[2]);