const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/ppcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PhotoShema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoShema);

// Photo.create({
//   title: 'Photo Title 1',
//   description: 'Photo Lorem Ipsum',
// });

Photo.find({}, (err, data) => {
  console.log(data);
});

const id = '6136544ae2346a154340ca1b';
Photo.findOneAndUpdate(
  id,
  {
    title: 'Title - 1 Updated',
    description: 'No Description',
  },
  (err, data) => {
    console.log(data);
  }
);
