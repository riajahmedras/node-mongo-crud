const express = require('express');

const app = express();
// const password = 'sKiM@uqzqYvKu5.';

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://riajahmed:sKiM@uqzqYvKu5.@cluster0.hrrbq.mongodb.net/riajdb?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/', (req, res) =>{
  //  res.send('Node was not installed here!')
  res.sendFile(__dirname + '/index.html');
})



client.connect(err => {
  const collection = client.db("riajdb").collection("riajcol");
  const product = {name: "potatoes", price: 30, quantity: 40};
  collection.insertOne(product)
  .then(result =>{
    console.log("One product added");
  })
  
  // client.close();
});


app.listen(3000, )