const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 8081;

app.use(cors());

app.get('/api/shoe-price/:id', (req, res) => {
    fetch(
        `https://bi8cxjuyll.execute-api.us-west-2.amazonaws.com/prices/shoes?id=${req.params.id}`
    )
        .then((response) => response.json())
        .then((response) => res.send(response));
});

app.listen(port, () => {
    console.log(`Started backend server at ${port}`);
});