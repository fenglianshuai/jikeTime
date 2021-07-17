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
                    width: 1000px;
                    height: 100px;
                    background: pind;
                    display: flex;
                    flex-wrap: wrap;
                }
                body div #box div {
                    width: 100px;
                    height: 100px;
                }
            </style>
            <title>Document</title>
        </head>
        <body>
            <div>
                <div id="box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </body>
        </html>`)
    })
}).listen(8082, () => {
    console.log('server start')
})