const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected to users database');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

const IdeaSchema = new mongoose.Schema({
    heading: String,
    para: String,
    image: String,
    createdAt: { type: Date, default: Date.now }
});


const Idea = mongoose.model('Idea', IdeaSchema, 'users'); 

app.get('/', (req, res) => {
    res.status(200).json({ message: "Service is running..." });  
})

// POST route to create a new idea
app.post('/api/ideas', async (req, res) => {
    try {
        const newIdea = new Idea(req.body);
        await newIdea.save();
        res.status(201).json(newIdea);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
