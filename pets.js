const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];
console.log('Usage: node pets.js [read | create | update | destroy]');

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    var pet = Number.parseInt(process.argv[3]);
    var pets = JSON.parse(data);
    if (Number.isNaN(pet)) {
      console.log(pets[pet]);
    } else {
      console.log(pets);
    }

  });
} else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf-8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }
    pets = JSON.parse(data);
    var pet = process.argv[3];
    if (!pets) {
      console.error(`Usage: ${node} ${file} ${cmd} GUEST`);
      process.exit(1);

    }

    pets.push(pet);
    var petsJSON = JSON.stringify(pets)
    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
      console.log(pet);
    });
  });
}
else {
  console.error(`Usage: ${node} ${file} [read | create]`);
  process.exit(1);
}
