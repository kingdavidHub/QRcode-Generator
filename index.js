import express from 'express';
import bodyParser from 'body-parser';




const app = express();
const port = 5000;


// middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.render('index.ejs');
});



app.listen(port, () => console.log(`Super server starting at port ${port} 🚀🚀🚀`));