const http = require('http')

http.createServer((req, res) => {
    let body = [];
    req.on('error', (err) => {
        console.error(err)
    }).on('data', (chunk) => {
        body.push(chunk)
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        console.log('body:', body);
        res.writeHead(200, { 'Content-Type': 'text/html;' })
        res.end(`
        <html maaaa=a>
        <head>
            <style>
                body div #box {
                    width: 100px;
                    height: 100px;
                    background: red;
                }
                body div #box {
                    width: 100px;
                    height: 100px;
                    background: pind;
                }
            </style>
            <title>Document</title>
        </head>
        <body>
            <div>
                <div id="box"></div>
            </div>
        </body>
        </html>`)
    })
}).listen(8082, () => {
    console.log('server start')
})