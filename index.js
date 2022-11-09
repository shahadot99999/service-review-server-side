const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mangoodbfirstproject.65jgjko.mongodb.net/test`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db('doctorDb').collection('services');
        const appointmentCollection = client.db('doctorDb').collection('appointments');

        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
            console.log(services);
        })

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        })

        //appointment

        app.get('/appointments', async (req, res) => {
            let query = {};

            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = appointmentCollection.find(query);
            const appoints = await cursor.toArray();
            res.send(appoints);
        })

        app.post('/appointments', async (req, res) => {
            const appointment = req.body;
            const result = await appointmentCollection.insertOne(appointment);
            res.send(result);
        })
    }
    finally {

    }
}

run()
app.get('/', (req, res) => {
    res.send('KLA Doctor server is running');
})

app.listen(port, () => {
    console.log(`KLA Doctor server running on ${port}`);
})