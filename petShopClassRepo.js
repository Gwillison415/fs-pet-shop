// const petsByID = require('./pets.json');  //the mockFS is checking to see if FS has asked for read write to a given file, require bypasses mockFS


let countr = 1;
const fs = require('fs');

// will be a string and likely need an obj to manipulate
// console.log(petsByID);
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
    // console.log(petsByID);

    return petsByID[id];
  }

  create(newPet) {
    if(!newPet.kind || !newPet.name || isNaN(newPet.age)) {return;}
    // var newID = generateNextID();
    const pets = JSON.parse(fs.readFileSync('./pets.json', 'utf-8'));
    // console.log(petsByID);
    // newPet = Object.assign({}, newPet, newID);
    pets.push(newPet);
    fs.writeFileSync('./pets.json', JSON.stringify(pets), 'utf-8');
    return newPet;
  }
  remove(id){
    const petsByID = JSON.parse(fs.readFileSync('./pets.json', 'utf-8'));
    if (!petsByID[id]) {
      return false;
    } else {
      delete petsByID[id];
      fs.writeFileSync('./pets.json', JSON.stringify(petsByID), 'utf-8');
      console.log(petsByID);
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
      targetPet = changesObj;
      pets[id] = targetPet;

    } else {
      targetPet = pets[id];
      Object.keys(changesObj).forEach( key => targetPet[key] = changesObj[key])
      pets[id] = targetPet;
      console.log('else', targetPet);
    }

    // console.log('targetPet', targetPet);

    fs.writeFileSync('./pets.json', JSON.stringify(pets), 'utf-8');
    // var targetPet = Object.assign({}, targetPet, changesObj);
    return targetPet;
  }

}


module.exports = PetFn;
