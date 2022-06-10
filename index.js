const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express()


const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.woyff.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const projectsCollection = client.db("portfolio").collection("projects");

        app.get('/projects', async (req, res) => {
            const query = {};
            const result = await projectsCollection.find(query).toArray();
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