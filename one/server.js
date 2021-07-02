const http = require('http')

http.createServer((req, res) => {
    let body = [];
    req.on('error', (err) => {
        console.error(err)
    })
    req.on('data', (chunk) => {
        body.push(chunk)
    })
    req.on('end', () => {
        body = Buffer.concat(body).toString();
        console.log('body:', body);
        res.writeHead(200, { 'Content-Type': 'text/html;' })
        res.end('hello world')
    })
}).listen(8082, () => {
    console.log('server start')
})