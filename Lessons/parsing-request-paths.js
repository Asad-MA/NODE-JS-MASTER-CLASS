import http from 'http';
import url from 'url';

var count = 0;

const SERVER = http.createServer((req , res)=>{
    console.log('Request NO:' , ++count);
    //Parsing URL
    var parsedURL = url.parse(req.url , true);

    /*
        parsedURL =  Url {
        protocol: null,
        slashes: null,
        auth: null,
        host: null,
        port: null,
        hostname: null,
        hash: null,
        search: null,
        query: [Object: null prototype] {},
        pathname: '/',
        path: '/',
        href: '/'
        }
    */

    //Logging parsedURL Object
    //console.log('ParsedURL:' , parsedURL);

    //Getting Path from parsedURL
    var path = parsedURL.path;
    //triming slashes from path {fist & last slash}
    var trimmedPath = path.replace(/^\/+|\/+$/g , '');

    // Loging Path 
    console.log('Requested Path:' , path);
    console.log('Trimmed Path:' , trimmedPath);

    res.end("Hello World");
});

SERVER.listen(4000 , ()=>{console.log(`SERVER is listening at PORT: 4000`)});