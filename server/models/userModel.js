const mongoose = require('mongoose');

// Create a Mongoose Schema and Model for user registration
const userSchema = new mongoose.Schema({ 
    name: String,
    contact: String,
    dob: String,
    profilepicture: String,
    cover: String,
    email: String,
    password: String,
    loginid:String
  },
   {
    collection:'reg_123' // collection name
  });


  const loginSchema = new mongoose.Schema({
    email:String,
    password:String,
    usertype:Number
},
{
 collection:'login' // collection name
});


const postSchema = new mongoose.Schema({
  like: Number,
  comment: String,
  description: String,
  photo: String,
  post: String,
  loginid:String,
  time:Date,
  currentdate:String
}, {
  collection: 'post' // collection name
});


const commentSchema = new mongoose.Schema({
  postid: { type: mongoose.Schema.Types.ObjectId, ref: 'post' },
  // postid: String,
  comment: String,
  userid: String // Make sure this field matches your user identifier data type
}, {
  collection: 'comment'
});




  const DataModel = mongoose.model('User', userSchema);
  const LoginModel = mongoose.model('login', loginSchema);
  const PostModel = mongoose.model('post', postSchema);
  const CommentModel = mongoose.model('comment', commentSchema);

  module.exports = {DataModel,LoginModel,PostModel,CommentModel}