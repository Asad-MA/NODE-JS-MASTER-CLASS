import http from 'http';
import url from 'url';

var count = 0;

const SERVER = http.createServer((req , res)=>{
    console.log('Request NO:' , ++count);
    //Parsing URL
    var parsedURL = url.parse(req.url , true);

    //Getting Path from parsedURL
    var path = parsedURL.path;
    //triming slashes from path {fist & last slash}
    var trimmedPath = path.replace(/^\/+|\/+$/g , '');

    //Getting method of incomming http requests
    var method = req.method.toLowerCase();

    // Loging Method
    console.log('Request recived with Method: ' , method);
    
    res.end("Hello World");
});

SERVER.listen(4000 , ()=>{console.log(`SERVER is listening at PORT: 4000`)});