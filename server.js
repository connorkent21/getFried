const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());


const Scraper = require('images-scraper');

const bing = new Scraper.Bing();

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ yeet: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.post('/get-images', async (req, res) => {
  let results = await bing.list({
    keyword: req.body.key,
    num: 10,
    detail: true,
  })
  .catch(err => {
    console.log('error', err);
  });
  console.log('these are the results: ', results);
  res.setHeader("Access-Control-Allow-Origin" , "*")
  return res.send({results});
});
