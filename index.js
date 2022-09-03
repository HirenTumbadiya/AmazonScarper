const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

const generateScraperUrl = (apikey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;


app.use(express.json());

app.get('/', (req,res) => {
    res.send('welcome to amazon scraper API')
});

//GET PRODUct detail
app.get('/products/:productId', async (req,res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
});

//GET PRODUct Reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
});

//GET PRODUct Offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offers-listing/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
});

//GET Serach Result
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
});


app.listen(PORT, () => console.log(`Server is runnning on port ${PORT}`));