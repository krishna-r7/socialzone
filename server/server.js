// app.js
const express = require('express');
const session = require('express-session'); //session1
const app = express();
const port = process.env.PORT || 5000;
const cors =require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const User = require('./models/userModel');//session4


var apiData =  require('./controller/Usercontroller');


mongoose.connect('mongodb://127.0.0.1:27017/socialmedia', { //dbname
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  session({
    secret: '09aec392fe4c2e504d8a56074f42153fc17d79d4b193f90dfd09341975c997598cd955ead25971d823780bb12f7f73994002e3e1297526d0047408820e72ded7', // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000 // Session expiration time (in milliseconds)
    }
  })
);

// app.use(bodyParser.urlencoded({ extended: true }));//session3
app.use(bodyParser.json());
app.use(cors());

app.use(express.json());


app.use('/',apiData);







app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
