const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;


const uri = "mongodb+srv://volunteer:volunteerNetwork22335@cluster0.qoz6i.mongodb.net/volunteerNetwork?retryWrites=true&w=majority"; 

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 5000;


client.connect(err => {
  const collection = client.db("volunteerNetwork").collection("register");
  app.post('/addRegister', (req, res) => {
    const registration = req.body;
    collection.insertOne(registration)
    .then(result => {
      res.send(result.insertedCount > 0);
    })
  })
  console.log('db connected success')
});





app.get('/', (req, res) => {
  res.send('Hello Volunteer!')
})

app.listen(process.env.PORT || port)