var http = require('http');

function handle_incoming_request(req, res){
    console.log("INCOMING REQUEST: " + req.method + " " + req.url);
    res.writeHead(200 , { "Content-Type" : "application/json" });
    res.end(JSON.stringily( { error: null }) + "\n");
    }

var s = http.createServer(handle_incoming_request);
s.listen(8080);


<!--//failure response will look like this:
{error: "missing data",
 message: "You nust include a last name for the user" }

//success responses will usually have a "data" object
{error:null,
 data: {
     user: {
         first_name: "Horatio",
         laat_name: "Gadsplatt III"
         email: "horatio@example.org"
     }
 }
}-->
