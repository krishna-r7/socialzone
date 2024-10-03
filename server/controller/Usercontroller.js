const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const{format} =require('date-fns');
router.use(cors());
router.use(express.json());
const { DataModel, LoginModel, PostModel, CommentModel } = require('../models/userModel');

const storage = multer.diskStorage({  ///images storage
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../client/public/uploads')); //your folder path to store file
  },
  filename: function (req, file, cb) {
     cb(null, file.originalname);
  },
 });
 
 const upload = multer({ storage: storage });




  // Define an API route for user registration and store in two tables login and reg_123

  router.post('/Submitformdata', async (req, res) => {
    try {
      // Set the default user type to 1
      const usertype = 1;
  
      // Extract email and password from the request body
      const { email, password } = req.body;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create a new loginModel instance
      const newlogin = new LoginModel({
        email,
        password:hashedPassword,
        usertype,
      });
      // console.log(newlogin)
  
      // Save the login data and get the saved login ID
      const savelogin = await newlogin.save();
      const loginid = savelogin._id;
  
      // Extract name, about, stack, and contact from the request body
      const { name,contact,dob } = req.body;
  
      // Create a new userRegModel instance with the login ID
      const savedUser = new DataModel({
        name,
        contact,
        dob,
        profilepicture:'defaultp.png',
        cover:'defaultc.png',
        loginid,
      });
      console.log(savedUser)
  
      // Save the user data
      await savedUser.save();
  
      // Respond with a 201 status and the saved login data
      res.status(201).json({ user: savelogin });
    } catch (error) {
      // Handle errors with a 500 status and an error message
      res.status(500).json({ error: 'Could not insert data' });
    }
  });




router.post('/Submitlogin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginData = await LoginModel.findOne({ email });

    if (loginData) {
      bcrypt.compare(password, loginData.password, function (err, result) {
        if (err) {
          throw err;
        } else {
          // console.log(result);
          if (result) {
            req.session.user_id = loginData._id;
            // console.log("sessonid:",req.session.user_id);
            req.session.usertype = loginData.usertype;
            if (loginData.usertype === 0) {
              console.log("Admin")
              userTypeString = 0;
            } else if (loginData.usertype === 1) {
              console.log("Dashboard")
              userTypeString = 1;
            } 
            res.status(201).json({ user: result,usertype: userTypeString  });
          } else {
            console.log("Login failed");
            res.status(401).json({ error: 'Login failed' });
          }
        }
      });
    } else {
      console.log("User not found");
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//Session for loggined-------

function requireLogin(req, res, next) {
  if (req.session.user_id) {
    next();
  } else {
    // User is not logged in, redirect to the login page.
    res.redirect('/'); 
  }
}



//Get the User data 
router.get('/Selectuserdata', async (req, res) => {
  try {
    userid =  req.session.user_id
    // console.log(userid)
    const allData = await DataModel.findOne({loginid : userid}); // Use the User model to findOne  documents
    if(allData){
      res.json(allData);
      // console.log(allData)
    }
    else{
      res.status(404).json({error: 'User data not found'})
    }

   // console.log(allData)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});


//Get the User data to admin
router.get('/Adminviewuserdata', async (req, res) => {
  try {
    userid =  req.session.user_id
    const allData = await DataModel.find();
    // console.log(allData) // Use the User model to find all documents
    if(allData){
      res.json(allData);
      // console.log(allData)
    }
    else{
      res.status(404).json({error: 'User data not found'})
    }

   // console.log(allData)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});


  //data from useeffect path and paramsid
  router.get('/edituserdata/:id', async (req, res) => { 
  const id = req.params.id;
  // const userid = req.session.user_id
  // console.log("Fetch:",id)
  const result = await DataModel.findOne({ _id: id });
  // const result = await DataModel.findOne({ loginid: userid });
  res.json(result);
});


//userdatas and propic............................................

router.post('/updateUser',upload.array('profilepicture',2), async (req, res) => {
//  console.log(req.file);
  try {
   const userid =  req.session.user_id
   const photo = req.files;
   const photo1 = photo[0];
    const photo2 = photo[1];
    const cover = photo2.originalname;
    const profile = photo1.originalname;
 
    const {name ,contact, dob} = req.body; 
   const postphoto=photo.originalname
    // console.log(postphoto);
    const updatepost = {
      name,
      contact,
      dob,
      profilepicture:profile,
      cover:cover
   
    };
    // console.log(updatepost)
    const updatedUser = await DataModel.findOneAndUpdate(
      { loginid: userid },
      { $set: updatepost },
      { new: true }
    );
    console.log("updatedUser:", updatedUser);
    if (!updatedUser) { 
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


router.delete('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).send('Unable to log out')
      } else {
        res.send('Logout successful')
      }
    });
  } else {
    res.end()
  }
})






//image post upload-----------------------------------------------------






 router.post('/addpost', upload.single('photo'), async (req, res) => {//photo is the name of input field of type="file"
  try {
    const { description, time } = req.body; // Access data form fields from req.body not get type="file"
    console.log(req.body);
    const photo = req.file; // Access the uploaded file using req.file
    console.log(photo)
    console.log(photo.originalname);
     postphoto=photo.originalname
     userid=req.session.user_id;
     const cdate=format(new Date(), 'yyyy-MM-dd')


     const addpostto = new PostModel({
      like:0,
      description,
      photo:postphoto,
      loginid:userid,
      time,
      currentdate:cdate
    });
    await addpostto.save();


    res.status(201).json({});
    // res.status(201).json({ user: savelogin });
  } catch (error) {
    res.status(500).json({ error: 'Could not insert data' });
  }
});


//Get the Profile page  Image data 
router.get('/Fetchposts', async (req, res) => {
  userid =req.session.user_id
  try {
    // Check if the user is authenticated and their session contains a user ID
    if (!req.session || !req.session.user_id) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Use Mongoose to perform aggregation
    const Postdata = await PostModel.aggregate([
      {
        $lookup: {
          from: "comment",
          localField: "_id", // Match the post's _id with the comment's postid
          foreignField: "postid",
          as: "comments"
        }
      },
      {
        $match: { loginid: userid }, // Match comments for a specific user
      },
        {
        $sort: { time: -1 }
      }
    ]);
// console.log("add",Postdata)
if (Postdata.length > 0) {
  Postdata.forEach(post => {
    // console.log('Post:', post);
    // console.log('Commentscbdbbedefb:', post.comments);
  });
  res.json({ Postdata });
  // console.log('join data', Postdata.comments);
} else {
  res.status(404).json({ error: 'No data found' });
}


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});

//otherview

router.get('/Otherposts/:loginedid', async (req, res) => {
  userid =req.params.loginedid
  try {
    // Check if the user is authenticated and their session contains a user ID
    // if (!req.session || !req.session.user_id) {
    //   return res.status(401).json({ error: 'Authentication required' });
    // }

    // Use Mongoose to perform aggregation
    const Postdata = await PostModel.aggregate([
      {
        $lookup: {
          from: "comment",
          localField: "_id", // Match the post's _id with the comment's postid
          foreignField: "postid",
          as: "comments"
        }
      },
      {
        $match: { loginid: userid }, // Match comments for a specific user
      },
        {
        $sort: { time: -1 }
      }
    ]);
// console.log("add",Postdata)
if (Postdata.length > 0) {
  Postdata.forEach(post => {
    // console.log('Post:', post);
    // console.log('Commentscbdbbedefb:', post.comments);
  });
  res.json({ Postdata });
  // console.log('join data', Postdata.comments);
} else {
  res.status(404).json({ error: 'No data found' });
}


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});




//Get the Dashboard page  Image data  Join
router.get('/Dashboard', async (req, res) => {
  try {
    // Check if the user is authenticated and their session contains a user ID
    if (!req.session || !req.session.user_id) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Use Mongoose to perform aggregation
    const Postdata = await PostModel.aggregate([
      {
        $lookup: {
          from: "reg_123",
          localField: "loginid",
          foreignField: "loginid",
          as: "userDetails"
        }
      },
      {
        $unwind: "$userDetails"
      },
      {
        $lookup: {
          from: "comment",
          localField: "_id", // Match the post's _id with the comment's postid
          foreignField: "postid",
          as: "comments"
        }
      },
      {
        $project: {
          _id: 1,
          like: 1,
          comment: 1,
          description: 1,
          photo: 1,
          post: 1,
          time: 1,
          currentdate: 1,
          loginedid: "$userDetails.loginid",
          userName: "$userDetails.name",
          contact: "$userDetails.contact",
          dob: "$userDetails.dob",
          email: "$userDetails.email",
          profilepicture: "$userDetails.profilepicture",
          comments: 1 // Include the comments
        }
      },
      {
        $sort: { time: -1 }
      }
    ]);

if (Postdata.length > 0) {
  Postdata.forEach(post => {
    // console.log('Post:', post);
    // console.log('Commentsnew:', post.comments);

    if (Array.isArray(post.comments) && post.comments.length > 0) {
      // Iterate through the array of comments for each post
      post.comments.forEach(comment => {
        // console.log('Comment:', comment);
        // Access individual comment properties like comment.comment and comment.userid
      });
    } else {
      // console.log('No comments for this post.');
    }
  });
  res.json({ Postdata });
  // console.log('join data', Postdata.comments);
} else {
  res.status(404).json({ error: 'No data found' });
}


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});

//-------------------------img post ended----------------------------------------


router.post('/like', async (req, res) => {
  try {
    const { clike, pid } = req.body;
    const data = await PostModel.findOne({ _id: pid });
    // console.log("Liked:",data)

    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }

    // data.clike = clike + 1;
    const updatelike = data.like+1;
    // console.log("updatelike:",updatelike)

    
    const updatedData = await PostModel.findOneAndUpdate(
      { _id: pid },
      { like: updatelike },
      { new: true } 
    );

    if (!updatedData) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(updatedData); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

//------------------------------------------commment-------------------------------------------
router.post('/commentuserdata', async (req, res) => {
  //console.log('hiii')
  try {
    const { postid, comment } = req.body;
    //console.log('Request body:', req.body);
    //console.log(postid)
    if (!postid || !comment) {
      return res.status(400).json({ error: 'Missing postid or comment' });
    }

    // Assuming 'user_id' is stored in the session
    const userid = req.session.user_id;

    const usercomment = new CommentModel({
      postid,
      comment,
      userid,
    });
//console.log(usercomment)
    await usercomment.save();

    res.status(201).json({ message: 'Comment registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Comment registration failed' });
  }
});

//delete post___________________________________________

router.delete('/postdelete/:postid', async (req, res) => {
  const postid = req.params.postid;
  // console.log("delid",postid)

  try {
    const deletedPost = await PostModel.findByIdAndDelete({_id : postid});

    if (deletedPost) {
      res.json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

//delete (Admin) user data post___________________________________________
router.delete('/adminuserdelete/:id', async (req, res) => {
  const id = req.params.id; // Use id instead of postid
  try {
    const deletedPost = await DataModel.findByIdAndDelete(id);

    if (deletedPost) {
      res.json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

//otherview profile

router.get('/Otherview/:loginedid', async (req, res) => { 
  const id = req.params.loginedid;
  // console.log("give",id);
  const result = await DataModel.findOne({ loginid: id });
  console.log(result);
  res.json(result);
});













  module.exports = router;
  