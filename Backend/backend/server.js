const express = require('express')
const app = express()
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb')
const cors = require('cors')

dotenv.config()

const url = process.env.MONGO_URI
const client = new MongoClient(url)

app.use(cors())
app.use(express.json())

const dbName = 'passop'
const port = process.env.PORT || 3000

client.connect()
  .then(() => {
    console.log('Connected to MongoDB')

    app.get('/', async (req, res) => {
      const db = client.db(dbName)
      const collection = db.collection('passwords')

      const findResult = await collection.find({}).toArray()

      res.json(findResult)
    })

    app.post('/', async (req, res) => {
      const password = req.body

      const db = client.db(dbName)
      const collection = db.collection('passwords')

      const insertResult = await collection.insertOne(password)

      res.send({
        success: true,
        result: insertResult
      })
    })

    app.delete('/', async (req, res) => {
      const password = req.body

      const db = client.db(dbName)
      const collection = db.collection('passwords')

      const deleteResult = await collection.deleteOne(password)

      res.send({
        success: true,
        result: deleteResult
      })
    })

    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err)
  })