//import net from 'net';

const net = require('net')


const server = net.createServer((socket) => {
    //console.log('making a connection');


    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');


    socket.end(`${year}-${month}-${date} ${hour}:${minutes}\n`);

}).listen(process.argv[2]);