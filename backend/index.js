const express = require('express');
const cors = require('cors');
const { regenerate, generateResponse, insertInDB } = require('./controllers');

const app = express();

app.use(express.json())
app.use(cors());

app.post('/generate', async (req, res) => {
    try {
        const response = await generateResponse(req.body);
        res.send(response);
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.post('/insert', async (req, res) => {
    try {
        const resp = await insertInDB(req.body);
        res.send(resp);
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.post('/regenerate', async (req, res) => {
    try {
        const response = await regenerate(req.body);
        res.send(response);
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.listen(4000, () => {
    console.log('Backend Server is running on port 4000');
});