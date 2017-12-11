var fs = require("fs");
var formidable = require('formidable');

exports.upload = function(request, response) {
  console.log("Rozpoczynam obsługę żądania upload.");
  var form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, files) {
    fs.renameSync(files.upload.path, files.upload.name);
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    exports.show = function(request, response) {
      fs.readFile( files.upload.name, "binary", function(error, file) {
          response.writeHead(200, {"Content-Type": "image/png"});
          response.write(file, "binary");
          response.end();
          });
    }
    response.end();
  });
};

exports.welcome = function(request, response) {
  console.log("Rozpoczynam obsługę żądania welcome.");
  fs.readFile('templates/start.html', function (err, html) {
    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    response.write(html);
    response.end();
  })
  
};

exports.error = function(request, response) {
  console.log("Nie wiem co robić.");
  response.write("404 :(");
  response.end();
};
