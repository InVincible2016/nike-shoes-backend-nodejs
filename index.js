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
        .then((response) => res.send(response))
        .catch(e => {
            console.error(e);
            return res.status(500);
        });;
});

app.get('/api/shoe-discount-price/:id', (req, res) => {
    const applyDiscount = (priceInfo) => ({
        ...priceInfo,
        // to prevent floating point number precision problem
        discountPrice: Math.round(priceInfo.shoePrice * 100 * 0.6) / 100
    })
    fetch(
        `https://bi8cxjuyll.execute-api.us-west-2.amazonaws.com/prices/shoes?id=${req.params.id}`
    )
        .then((response) => response.json())
        .then((response) => {
            return res.send(applyDiscount(response))
        }).catch(e => {
            console.error(e);
            return res.status(500);
        });
});

const server = app.listen(port, () => {
    console.log(`Started backend server at ${port}`);
});

module.exports = server