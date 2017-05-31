const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];
//console.log('Usage: node pets.js [read | create | update | destroy]');

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    let pet = Number.parseInt(process.argv[3]);
    var pets = JSON.parse(data);

    if (Number.isNaN(pet) === false) {
      if (pet < 0 || pet >= pets.length) {
        console.log(`Usage: node pets.js read ${pet}`);
      } else {
        console.log(pets[pet]);
      }
    } else {
      console.log(pets);
    }

  });
} else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf-8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }
    let pets = JSON.parse(data);
    let pet = {};
    var petName = process.argv[5];
    var petSpecies = process.argv[4];
    var age = Number.parseInt(process.argv[3]);
    //console.log('etxt', ((petName) && (petSpecies)));
    if (petName && petSpecies && age > 0) {
      pet = {
        'age': age,
        'kind': petSpecies,
        'name': petName,
      };
      // console.log(pet);

    } else {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
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
} else if (cmd === 'update') {
  fs.readFile(petsPath, 'utf-8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }
    let pets = JSON.parse(data);
    pets.pop();
    let pet = {};
    var petName = process.argv[5];
    var petSpecies = process.argv[4];
    var age = Number.parseInt(process.argv[3]);
    //console.log('etxt', ((petName) && (petSpecies)));
    if (petName && petSpecies && age > 0) {
      pet = {
        'age': age,
        'kind': petSpecies,
        'name': petName,
      };
      // console.log(pet);

    } else {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
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
} else if (cmd === 'destroy') {
  fs.readFile(petsPath, 'utf-8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }
    let pets = JSON.parse(data);

    let pet = {};

    var idx = process.argv[3];
    //console.log('etxt', ((petName) && (petSpecies)));
    if (cmd.length > 0 && idx >= 0 ) {

      // console.log(pet);

    } else {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);

    }

    let beginning = pets.slice(0, idx);
    let end = pets.slice(idx+1);
    let combinedArray = beginning.concat(end);
    console.log(beginning, end, combinedArray);
    var petsJSON = JSON.stringify(combinedArray)
    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
      console.log(petsJSON);

    });
  });
}
else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exitCode = 1;
}
