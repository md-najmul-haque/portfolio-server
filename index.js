const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectId } = require('bson')
require('dotenv').config()
const app = express()


const port = process.env.PORT || 5000;

//middleware
const corsConfig = {
    origin: true,
    credentials: true,
}
app.use(cors(corsConfig));

app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.woyff.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const projectsCollection = client.db("portfolio").collection("projects");

        app.get('/projects', async (req, res) => {
            const query = {};
            const result = await projectsCollection.find(query).toArray();
            res.send(result);
        })

        app.get('/projects/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) };
            const result = await projectsCollection.findOne(query)
            res.send(result);
        })
    }

    finally {

    }

}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('portfolio server is running')
})

app.listen(port, console.dir('listening to port', port))