import http2 from 'http2';
import fs from 'fs';

const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert:fs.readFileSync('./keys/server.crt')
},(req, res) => {
    
    console.log(req.url);

    // res.writeHead(200, {'Content-Type': 'text/html'});
    // res.write("<h1>hola mundo</h1>");
    // res.end();

    // const data = {name: "juan", age: 30, city: "New York"};
    // res.writeHead(200, {'Content-Type': 'application/json'});
    // res.end(JSON.stringify(data));

    if(req.url === '/'){        
        res.writeHead(200, {'Content-Type': 'text/html'});
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.write(htmlFile);
        res.end();
        return;
    }
    
    if(req.url?.endsWith('.css')){
        res.writeHead(200, {'Content-Type': 'text/css'});
        const htmlContent = fs.readFileSync(`public/${req.url}`, 'utf-8');
        res.write(htmlContent);
        res.end();
        return;
    }

    if(req.url?.endsWith('.js')){
        res.writeHead(200, {'Content-Type': 'application/javascript'});
        const htmlContent = fs.readFileSync(`public/${req.url}`, 'utf-8');
        res.write(htmlContent);
        res.end();
        return;
    }

    
});


server.listen(3000, () =>{
    console.log("server run on port 3000...");
});