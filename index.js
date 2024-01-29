import express from 'express';
import bodyParser from 'body-parser';
import QRCode from 'qrcode';
import favicon from'serve-favicon';
import { dirname } from "path";
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 5000;


// middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(__dirname + "/public/img/favicon.ico"));




app.get('/', (req, res) => {
  res.render('index.ejs', { generatedQRcode: '', download: ''});;
});

app.post('/qrcode', async(req, res) => {
  try {
    // generate qrcode data
    const generatedQRcode = await QRCode.toDataURL(req.body.url, {
      scale: 8,
      margin: 4,
    });


    // save qrcode to file for download feature
      QRCode.toFile('public/img/data/qrcode.png', req.body.url, function (err) {
      // new qrcode overwrites the old one
      if (err) throw err;
      console.log('File created!');
    });``


    // File overwrite and being passed 
    res.render('index.ejs', { generatedQRcode, download: '/img/data/qrcode.png'});
  } catch (err) {
    throw err;
  }
});

// Error handling middleware
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.redirect('/');
});




app.listen(port, () => console.log(`Super server starting at port ${port} 🚀🚀🚀`));