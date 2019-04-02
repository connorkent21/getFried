const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const Jimp = require('jimp');
const base64 = require('base-64');
const utf8 = require('utf8');


app.use(cors());


async function asyncForEach(arr, func) {
  for (let i = 0; i < arr.length; ++i) {
    await func(arr[i]);
  }
}

const Scraper = require('images-scraper');

const bing = new Scraper.Bing();

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ yeet: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.post('/get-images/:key', async (req, res) => {
  console.log('this is the req: ', req);
  let results = await bing.list({
    keyword: req.params.key,
    num: 10,
    detail: true,
  })
  .catch(err => {
    console.log('error', err);
  });
  // console.log('these are the results: ', results);
  // asyncForEach(results, async (img) => {
  //   if (img.size.replace('kB', '') > 750) {
  //     Jimp.read(img.url)
  //     .then(image => {
  //       console.log('this is the image: ', image);
  //       image.resize(250, 250).getBase64(Jimp.MIME_JPEG, (err, newImg) => {
  //         // console.log('this is the new URI: ', newImg);
  //         img.url = newImg;
  //       });
  //       // console.log('this is the new iamge: ', image);
  //     })
  //   } else {
  //     console.log('shes good');
  //   }
  // }).then(() => {
  //   console.log('\n\n\nthis results now: ', results, '\n\n\n');
  //   res.setHeader("Access-Control-Allow-Origin" , "*")
  //   res.send({results});
  // });
  console.log('this is the first url: ', results[0].url);
  Jimp.read(results[0].url)
  .then( (image) => {
    console.log('this is the image we trying to resize: ', image);
    return image.resize(256, 256).getBase64(Jimp.AUTO, (e, img64) => {
      // console.log('this is the base64 version: ', img64);
      results[0].base64img = img64;
    })
  }).then(newSize => {
    console.log('this is the new image hopefully: ', newSize);
    results[0].height = newSize;
    res.setHeader("Access-Control-Allow-Origin" , "*")
    res.send({results});
  }).catch(err => {
    console.log('error with images: ', err);
  });


});
