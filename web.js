var http = require("http");

function process_request(req, res) {
    var body = 'Thanks for calling!\n';
    var content_length = body.length;
    res.writeHead(200, {
        'Content-Length' : content_length,
        'Content-Type' : 'text/plain'
    });
    res.end(body);
    }
    
    var s = http.createServer(process_request);
    s.listen(8080);
    
    #to run
    node web.js
    
    #To test
    curl -i http: //localhost:8080
    
    #downloading curl for windows 
    Download the Windows binaries for curl by visiting http://curl.haxx.se/download.html Win32-Generic
