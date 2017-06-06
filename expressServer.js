const fs = require('fs');
var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
//borrowed from node AND STILL USEFUL
const path = require('path');
var petsPath = path.join(__dirname, '/pets.json');

var bodyParser = require('body-parser');
//var multer = require('multer'); // v1.0.5
//var upload = multer(); // for parsing multipart/form-data
//           /\ not needed for post req, used for file upload

app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.disable('')
app.get('/pets', sendFullJSON);
app.get('/pets/:id', sendJSONbyID);
app.post('/pets', addPostedObj) //BONUS
app.listen(port, function () {
  console.log('listening on port', port);
})
app.use(function (req, res) {
  res.sendStatus(404);
})
// notes from nestor
// app.use(express.status(path.resolve(__dirname, 'public/')));
// app.post('/request-body', (request, response) =>{
//   const body = request.body;
//   response.send(body);
// })
// app.get('/pangolin.html', (request, response) => {
//   console.log(">>>>");
//   response.sendFile(path.resolve(__dirname, 'public/pangolin.html'))
// })




function sendFullJSON(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    // var pets = JSON.parse(data);
  res.set('content-type', 'application/json');
  res.status(200);
  res.send(data);
});
}
function sendJSONbyID(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    var regularPetObj = JSON.parse(data);
  if (req.params.id < regularPetObj.length && req.params.id >= 0) {
    res.set('content-type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(regularPetObj[req.params.id]));
  } else {
    res.set('content-type', 'text/plain');
    res.status(404);
    res.send('Not Found');
  }
});
}

//use HTML form to send a post
// could write node script testpost.js  script will use fetch to post to my server
// postman can also send post requests
function addPostedObj(request, response) {

  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    var regularPetObj = request.body;

  });
    var dataToAppend = JSON.stringify(regularPetObj);
  fs.appendFile('message.txt', dataToAppend, (err) => {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });


}
module.exports = app;
