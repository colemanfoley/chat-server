/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */
var messageLog = [{"username": "Default", "text": "Default message"}];

exports.handleRequest = function(request, response) {
  console.log("Serving request type " + request.method
            + " for url " + request.url);
  var defaultCorsHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10 // Seconds.
  };

  if (request.url === "/classes/messages") {
    if (request.method === "GET") {
      response.writeHead(200, defaultCorsHeaders);
      console.log(messageLog);
      response.end(JSON.stringify(messageLog));
    } else if (request.method === "POST") {
      //response.writeHead(302, {"Content-Type": "application/json"});
      response.writeHead(302, defaultCorsHeaders);
      request.on('data', function(chunk) {
        messageLog.push(chunk);
      });
      request.on('end', function() {

        response.end(JSON.stringify(messageLog));
      });
    } else if (request.method === "OPTIONS") {
      response.writeHead(200, defaultCorsHeaders);
      response.end();
    }
  } else {
    response.writeHead(404, defaultCorsHeaders);
    response.end();
  }
};