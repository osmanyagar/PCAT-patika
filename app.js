const express = require('express');
const path = require('path');
const ejs = require('ejs');
const e = require('express');
const app = express();

//template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', (req, res) => {
  // res.sendFile(path.resolve(__dirname,'temp/index.html'));
  res.render('index');
});

app.get('/about',(req,res) =>{
  res.render('about');
});
app.get('/add',(req,res) =>{
  res.render('add');
});
app.post('/photos',(req,res) => {
    console.log(req.body);
    res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
