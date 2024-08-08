import http from 'http';
import url from 'url';
import StringDecoder from 'string_decoder';

var count = 0;

const SERVER = http.createServer((req , res)=>{
    console.log('Request NO:' , ++count);
    //Parsing URL
    var parsedURL = url.parse(req.url , true);

    // getting query string as object
    var queryStringObject = parsedURL.query;

    //Getting Path from parsedURL
    var path = parsedURL.path;

    //triming slashes from path {fist & last slash}
    var trimmedPath = path.replace(/^\/+|\/+$/g , '');

    //Getting method of incomming http requests
    var method = req.method.toLowerCase();

    // Geting Header object
    var headers = req.headers;

    // Parsing Payloads
    var decoder = new StringDecoder.StringDecoder('utf-8');
    //Data comes in using streams so we need to join streams to mahe complete data.
    var buffer = ''; 

    req.on('data' , (data)=>{
        buffer += decoder.write(data);
        console.log('Data Recived: ' , data);
    })

    req.on('end' , ()=>{
        buffer += decoder.end();
        res.end("Hello World");

        console.log("Request Recived With Data: " , buffer);
    })
  
    
    
});

SERVER.listen(4000 , ()=>{console.log(`SERVER is listening at PORT: 4000`)});