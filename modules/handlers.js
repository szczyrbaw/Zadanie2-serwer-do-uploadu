var fs = require("fs");
var formidable = require('formidable');

exports.upload = function(request, response) {
  console.log("Rozpoczynam obsługę żądania upload.");
  
  var form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, files) {
    fs.readFile('templates/start.html', function (err, html) {
      fs.renameSync(files.upload.path, files.upload.name);
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write("<h3 id='gotImage'>Received image:</h3>");
      response.write("<div class='container'><img src='/show' /></div>");
      exports.show = function(request, response) {
        fs.readFile( files.upload.name, "binary", function(error, file) {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();    
        });
      };
      response.end();
    });
    
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

exports.styles = function(request, response) {
    if(request.url == '/style.css'){
    fs.readFile('style.css', function(err, css){
      response.writeHead(200, {'content-type': 'text/css'});
      if(err) response.write('index nao encontrado');
      response.write(css);
      response.end();
    });
  }
};

exports.error = function(request, response) {
  console.log("Nie wiem co robić.");
  response.write("404 :(");
  response.end();
};
