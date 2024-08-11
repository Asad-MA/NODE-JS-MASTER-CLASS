import http from 'http';
import url from 'url';
import StringDecoder from 'string_decoder';

import exportEnv from './config.js';

const SERVER = http.createServer((req, res) => {
    //Parsing URL
    var parsedURL = url.parse(req.url, true);

    //Getting Path from parsedURL
    var path = parsedURL.pathname;

    //triming slashes from path {fist & last slash}
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // getting query string as object
    var queryStringObject = parsedURL.query;

    //Getting method of incomming http requests
    var method = req.method.toLowerCase();

    // Geting Header object
    var headers = req.headers;

    // Parsing Payloads
    var decoder = new StringDecoder.StringDecoder('utf-8');
    //Data comes in using streams so we need to join streams to mahe complete data.
    var buffer = '';

    req.on('data', (data) => {
        buffer += decoder.write(data);
    })

    req.on('end', () => {
        buffer += decoder.end();

        var data = {} //empty object for now
        console.log('Trimmed Path: ', trimmedPath);
        var handler = ROUTES[trimmedPath] ? ROUTES[trimmedPath] : ROUTES.notFound;

        handler(data, function (statusCode, response, type) {
            res.writeHead(statusCode, { 'Content-Type': type });
            res.end(response);
            console.log('Respnse Sended: ', response);
        });

    })



});

SERVER.listen(exportEnv.port, () => { console.log(`SERVER is listening at PORT: ${exportEnv.port} in ${exportEnv.envName} Environment`) });


const HANDLERS = {
    requestData: function (data, callback) {
        callback(200, JSON.stringify({ 'name': 'Simple Handler' }), 'application/json');
    },

    demo: function (data, callback) {
        callback(200, `<h1>Hello Node JS</h1>`, 'text/html');
    },

    notFound: function (data, callback) {
        callback(404, '<h3>404<br>NOT FOUND</h3>', 'text/html');
    }
}

const ROUTES = {
    'requestData': HANDLERS.requestData,
    'demo': HANDLERS.demo,
    'notFound': HANDLERS.notFound,
}