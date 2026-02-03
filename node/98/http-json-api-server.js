const http = require('http');

http.createServer((req, res)=>{

    const url = new URL(req.url, 'http://localhost');

if(url.pathname === '/api/parsetime'){
    const isoTime = url.searchParams.get('iso');
    const date = new Date(isoTime);
    const result = {
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
    }
    res.end(JSON.stringify(result));
}

}).listen(process.argv[2]);