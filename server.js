// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize app and middleware
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://abdullahcountree:oR1oMMMBxLUF2yuB@cluster0.2f19i.mongodb.net/coming-soon').then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define schema and model
const submissionSchema = new mongoose.Schema({
    name: String,
    phone: String,
    specialization: String
});

const Submission = mongoose.model('Submission', submissionSchema);

// API route to handle form submissions
app.post('/api/submit', async (req, res) => {
    try {
        const { name, phone, specialization } = req.body;
        const newSubmission = new Submission({ name, phone, specialization });
        await newSubmission.save();
        res.status(201).json({ message: 'Submission received!' });
    } catch (error) {
        console.error('Error saving submission:', error);
        res.status(500).json({ message: 'Failed to submit' });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
