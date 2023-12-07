const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());

// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
// }));

app.get('/', async (req, res) => {
    try {
        let data = new FormData();
        data.append('grant_type', 'client_credentials');
        data.append('client_id', '158aad59-849b-4ec9-bfe4-742c4675153d');
        data.append('client_secret', 'BPL8Q~CoUI-V5ggtx0TZZBfLoShJQLWQsopP_cv~');
        data.append('resource', 'https://netwaysuaedemo.crm4.dynamics.com');

        let config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: 'https://login.windows.net/2ab2b5d0-18af-4aa0-9010-cb69d0c7b92f/oauth2/token',
            headers: {
                ...data.getHeaders()
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                const token = response.data.access_token;
                return res.json(token);
            })
            .catch((error) => {
                console.log(error);
            });


        // return res.json({ message: 'ExpressJS backend is working!' });
    } catch (error) {
        console.error(error.message);
        throw new Error('Failed to fetch token');
    }
});

app.post('/api/ntw_appointments', async (req, res) => {
    try {
        const data = req.body;
        console.log(data);

        if (!data) {
            return res.status(400).json({ error: 'Invalid request format' });
        }

        res.json({ message: 'Data received successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.error(error);
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});