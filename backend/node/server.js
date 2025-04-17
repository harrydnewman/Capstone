require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;
app.use(cors());
app.use(express.json());

// Create client
const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1
});

// Connect to MongoDB
async function startServer() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    // Optional: Access a database and collection
    const db = client.db('capstone-project');
    const collection = db.collection('user-feedback');

    app.get('/', async (req, res) => {
      const data = await collection.find().toArray();
      res.json(data);
    });

    app.post('/survey', async (req, res) => {
        try {
          const data = req.body;
          await collection.insertOne(data);
          res.status(200).json({ message: 'Survey saved successfully' });
        } catch (err) {
          console.error('❌ Error inserting survey:', err);
          res.status(500).json({ error: 'Internal server error' });
        }
      });

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
}

startServer();
