import express from 'express';
import bodyParser from 'body-parser';
import QRCode from 'qrcode';




const app = express();
const port = 5000;


// middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.render('index.ejs', { generatedQRcode: '' });;
});

app.post('/qrcode', async(req, res) => {
  try {
    if(!req.body.url){
      res.redirect('/');
    }
    const generatedQRcode = await QRCode.toDataURL(req.body.url);
    res.render('index.ejs', { generatedQRcode });
  } catch (err) {
    throw err;
  }
});






app.listen(port, () => console.log(`Super server starting at port ${port} 🚀🚀🚀`));