// const petsByID = require('./pets.json');  //the mockFS is checking to see if FS has asked for read write to a given file, require bypasses mockFS


let countr = 1;
const fs = require('fs');

function generateNextID() {
  return countr++;

}


class PetFn {
  constructor(path) {
    this.path = path;
  }

  query(){
  return new Promise( (resolve, reject) => {

      fs.readFile(this.path, 'utf8', function(err, data) {
        if (err) {
          reject(err);
          return;
        }
        var regularPetObj = JSON.parse(data);
        resolve(regularPetObj);

      // return Object.keys(regularPetObj).map(id => {return petsByID[id]});
    });

  });
  }

  get(id){
    const petsByID = JSON.parse(fs.readFileSync('./pets.json', 'utf-8'));
    return petsByID[id];
  }

  create(newPet) {
    if(!newPet.kind || !newPet.name || isNaN(newPet.age)) {return;}
    const pets = JSON.parse(fs.readFileSync('./pets.json', 'utf-8'));
    pets.push(newPet);
    fs.writeFileSync('./pets.json', JSON.stringify(pets), 'utf-8');
    return newPet;
  }
  remove(id){
    const pets = JSON.parse(fs.readFileSync('./pets.json', 'utf-8'));
    if (!pets[id]) {
      return;
    } else {
      var deletedPet = pets[id];
      delete pets[id];
      fs.writeFileSync('./pets.json', JSON.stringify(pets), 'utf-8');
      return deletedPet;
    }
  }
  update(id, changesObj) {
    //including changesObj.id prevents the caller from attempting to change the ID. You should never allow changing the ID of an existing entity.
    if (!id || changesObj.id) {
      return;
    }
    const pets = JSON.parse(fs.readFileSync('./pets.json', 'utf-8'));
    var targetPet;
    if (changesObj.kind && changesObj.age && changesObj.name) {
      pets[id] = changesObj;
    } else {
      Object.keys(changesObj).forEach( key => pets[id][key] = changesObj[key]);
    }

    fs.writeFileSync('./pets.json', JSON.stringify(pets), 'utf-8');
    // var targetPet = Object.assign({}, targetPet, changesObj);  --- another method for object creation from a previous obj
    return pets[id];
  }

}


module.exports = PetFn;
