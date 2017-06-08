const PetClassFunctions = require('./petShopClassRepo.js');
const pathName = './pets.json';
const petClassFunctions = new PetClassFunctions(pathName);

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors(false)); // NOTE: Don't do this in Production code
app.use(bodyParser.json());

app.get('/pets/:id', (req, res) => {
  const targetID = req.params.id;
  const targetPet = petClassFunctions.get(targetID);
  if (!targetPet) {
    res.sendStatus(404);
    return;
  }
  res.send(targetPet);

});

app.get('/pets', (req, res) =>{
  petClassFunctions.query().then((resolvedData) => {
    res.send(resolvedData);
  })
  .catch(err => res.sendStatus(500));
})
// look at get pets/;id test and see where 404 sends me
app.post('/pets', (req, res) =>{
  let newPet = req.body;
  newPet = petClassFunctions.create(newPet);
  if (!newPet) {
    // console.log('stringssss');
    res.sendStatus(400);
  } else {

    // res.status(200).send(newPet);

    res.send(newPet)
  }
});


app.delete('/pets/:id', (req, res) =>{
  const id = req.params.id;
  const petToDelete = petClassFunctions.remove(id);
  console.log(petToDelete);
  if (!petToDelete) {
    console.log('fail status sent');
    res.sendStatus(404);
  } else {
    console.log('success status sent');
    res.send(petToDelete);
  }

});

app.patch('/pets/:id', (req, res) =>{
  const id = req.params.id;
  const changesToMake = req.body;
  // console.log('id', id, 'changes', changesToMake);
  const petToUpdate = petClassFunctions.update(id, changesToMake);
  if (!petToUpdate) {
    res.sendStatus(404);
  } else {
    res.send(petToUpdate);
  }
})

app.use((request, response) => {
  response.sendStatus(404);
});

app.listen(8000, ()=>{
  console.log('listening on port 8000');
})
module.exports = app;
