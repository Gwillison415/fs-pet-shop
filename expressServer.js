const fs = require('fs');
var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
//borrowed from node
const path = require('path');
var petsPath = path.join(__dirname, '/pets.json');


// app.disable('')
app.get('/pets', sendFullJSON);
app.get('/pets/:id', sendJSONbyID);
app.listen(port, function () {
  console.log('listening on port', port);
})
app.use(function (req, res) {
  res.sendStatus(404);
})

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
