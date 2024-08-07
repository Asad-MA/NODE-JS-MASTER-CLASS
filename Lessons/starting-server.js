import http from 'http';

const SERVER = http.createServer((req , res)=>{
    res.end("Hello World");
});

SERVER.listen(4000 , ()=>{console.log(`SERVER is listening at PORT: 4000`)});