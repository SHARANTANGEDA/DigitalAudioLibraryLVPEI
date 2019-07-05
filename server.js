const express = require('express');
const app=express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const uploads = require('./routes/api/upload');
const superAdmin = require('./routes/api/superAdmin')
// const MongoClient = require('mongodb').MongoClient;

const path = require('path');
const methodOverride = require('method-override');

const db = require('./config/keys').mongoURI;


mongoose.connect(db,{useNewUrlParser: true})
  .then(() => {
    console.log('MongoDB Connected')
  })
  .catch(err => console.log(err,'Not Connecting'));
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

//passport middleware and Config
app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users',users);
app.use('/api/upload',uploads)
app.use('/api/superAdmin',superAdmin)

//Server static assets if in production
if(process.env.NODE_ENV === 'production') {
  //Set static folder
  console.log({'IN node_env':process.env.NODE_ENV})
  app.use(express.static('client/build'));
  app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));

