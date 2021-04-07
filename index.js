const express = require('express');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectID;

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })) 
// const password = 'sKiM@uqzqYvKu5.';

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://riajahmed:sKiM@uqzqYvKu5.@cluster0.hrrbq.mongodb.net/riajdb?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


app.get('/', (req, res) => {
  //  res.send('Node was not installed here!')
  res.sendFile(__dirname + '/index.html');
})



client.connect(err => {
  const productCollection = client.db("riajdb").collection("riajcol");
  
  app.get('/products', (req, res) =>{
    productCollection.find({})
    .toArray((err, documents) =>{
      res.send(documents)
    })
  })

  app.get('/product/:id', (req, res)=>{
    productCollection.find({_id: ObjectId(req.params.id)})
    .toArray((err, documents)=>{
      res.send(documents[0]);
    })
  })

  app.post('/addProduct',  (req, res) => {
    const product = req.body;
    productCollection.insertOne(product)
    .then(result =>{
      console.log('data added sucll');
      res.redirect('/')
    })
  })


  // https://docs.mongodb.com/guides/server/update/
  app.patch('/update/:id', (req, res) =>{
    productCollection.updateOne({_id:ObjectId(req.params.id)},
      {
        $set: {price: req.body.price, quantity: req.body.quantity}
      })
      .then(result=>{
        if(result){
          res.send(result.modifiedCount > 0);
        }
      })
  })

  app.delete('/delete/:id', (req, res) => {
    productCollection.deleteOne({_id:ObjectId(req.params.id)})
    .then((result) =>{
      res.send(result.deletedCount > 0);
    })
  })


});


app.listen(3000, )