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
                #box {
                    width: 500px;
                    height: 100px;
                    display: flex;
                    flex-wrap: wrap;
                    background-color:rgb(255,255,255);
                }
                #box div {
                    width: 100px;
                    height: 100px;
                    background-color: rgb(0,0,255);
                }
                #box #one {
                    background-color: rgb(255,0,0);
                }
                #box .c1 {
                    background-color: rgb(0,123,255);
                }
            </style>
            <title>Document</title>
        </head>
        <body>
            <div id="box">
                <div id="one"></div>
                <div class="c1"></div>
            </div>
        </body>
        </html>`)
    })
}).listen(8082, () => {
    console.log('server start')
})