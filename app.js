const express = require('express');
const path = require('path');
const ejs = require('ejs');
const e = require('express');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const Photo = require('./models/Photo');
const methodOverride = require('method-override');
const app = express();

const mongoPath = 'mongodb+srv://osman2:Cafw0gUiHTazwFr9@cluster0.aazzx.mongodb.net/Pcat-Test?retryWrites=true&w=majority';
mongoose.connect(mongoPath, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method',{
  methods:['POST','GET']
}));


app.get('/', async (req, res) => {
  const photoms = await Photo.find({});
  console.log(photoms.length);
  // res.sendFile(path.resolve(__dirname,'temp/index.html'));
  res.render('index',{
    photoms
  });
});

app.get('/about',(req,res) =>{
  res.render('about');
});
app.get('/add',(req,res) =>{
  res.render('add');
});

app.get('/photo/:id',async (req,res) =>{
  console.log(req.params.id);
  const photosn = await Photo.findById(req.params.id);
  res.render('photo',{
    photosn
  })
});

app.get('/photos/edit/:id',async (req,res) =>{
  console.log(req.params.id);
  const photosn = await Photo.findById(req.params.id);
  res.render('edit',{
    photosn
  })
});

app.put('/photos/:id', async (req,res) =>{
  const photo = await Photo.findOne({_id:req.params.id});
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save()

  res.redirect(`../photo/${req.params.id}`);
});

app.delete('/photo/:id', async (req,res) =>{
   const photo = await Photo.findOne({_id: req.params.id});
   let deletedImage = __dirname + '/public' + photo.image;
   await console.log(deletedImage);
   await fs.unlinkSync(deletedImage);
   await Photo.findByIdAndRemove(req.params.id);
   res.redirect('/');
});

app.get('/busbod',async(req,res) =>{
  res.render('busbod');
});

app.post('/busbodypost', function(req, res) {
  var file;
  if(!req.files)
  {
      res.send("File was not found");
      return;
  }
  file = req.files  // here is the field name of the form
  res.send(file);
});




app.post('/photos',async (req,res) => {
    // console.log(req.files.image);
    // await Photo.create(req.body);
    // res.redirect('/');

    const uploadDir = 'public/uploads';

    if(!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir)
    }

    let uploadeImage = req.files.image;
    let updateImageday = JSON.stringify(new Date().getDate());
    let updateImagemount = JSON.stringify(new Date().getMonth()+1);
    let uploadPath = __dirname +'/public/uploads/' + `${updateImageday}-${updateImagemount}-${uploadeImage.name}`;

    uploadeImage.mv(uploadPath, async () =>{
      await Photo.create({
        ...req.body,
        image: '/uploads/' + `${updateImageday}-${updateImagemount}-${uploadeImage.name}`,
      });
      await res.redirect('/');
    });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
