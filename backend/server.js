const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

app.use(express.json());

app.post('/chat', async (req, res) => {
    const { prompt } = req.body;
    
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/engines/davinci-codex/completions',
            {
                prompt,
                max_tokens: 150,
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).send('Something went wrong');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
