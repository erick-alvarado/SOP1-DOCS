//npm run dev
const express = require('express');
const app = express();
const cors = require("cors");
app.use(cors());

const MongoClient = require('mongodb').MongoClient

const connectionString = 'mongodb+srv://erickalv:erickalv@sop1cluster.zpizi7t.mongodb.net/test'
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    // Nombre del proyecto
    const db =  client.db('sop1')

    // Nombre de la colleccion
    const quotesCollection = db.collection('tweet')

    app.use(express.json());

    app.get('/', (req, res) => {
        quotesCollection.find().toArray()
          .then(results => {
            console.log(results)
            res.status(200).send(results)
          })
          .catch(error => console.error(error))
      })

    app.post('/add', (req, res) => {
        console.log(req.body)
        quotesCollection.insertOne(req.body)
          .then(result => {
            console.log(result)
            res.status(200).send("Mensaje almacenado")
          })
          .catch(error => console.error(error))
    })

    app.listen(8080, function() {
        console.log('listening on 8080')
      })

  }).catch(console.error)


