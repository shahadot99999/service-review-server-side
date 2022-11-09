const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mangoodbfirstproject.65jgjko.mongodb.net/test`;
// console.log(uri);
// MongoClient.connect(uri, function (err, client) {
//     const collection = client.db("test").collection("devices");
// })

app.get('/', (req, res) => {
    res.send('KLA Doctor server is running');
})

app.listen(port, () => {
    console.log(`KLA Doctor server running on ${port}`);
})