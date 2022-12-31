import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
// import { v4 as uuidv4 } from 'uuid';
import multer from "multer";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static("./uploads"));  // upload folder should be in is in root directory of backed folder

const saltRounds = 10;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}.${file.originalname}`);
  },
});
const fileFilter = (req, file, cb) => {
  file.mimetype.startsWith("image")
    ? cb(null, true)
    : cb(new Error("only images is allowed"));
};

const upload = multer({ storage, fileFilter });

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/fbCloneDB");  // for local mongodb

  // await mongoose.connect("mongodb+srv://shivanisinha:BZm7hNYRgPRsFkF7@cluster0.0qzgzcg.mongodb.net/test")     // for online mongodb atlas
}

const postSchema = new mongoose.Schema({
  userId: String,
  caption: String,
  image: String,
  date: String,
  comments: {
    type: Array,
    default: [],
  },
  likes: {
    type: Array,
    default: [],
  },
});
const userSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  posts:{
    type: Array,
    default: [],
  },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

app.get("/:id", (req, res) => {
  const id = req.params.id;
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      return res.send({ err });
    }
    if (user) {
      const posts = user?.posts?.reverse();
      const userObj = { ...user, posts };
      res?.status(200).json(userObj);
    }
  });
});

app.get("/users-posts/:id", (req, res) => {
  const id = req.params.id;
  let usersPosts = [];
  Post.find({},(err,posts)=>{
    if(posts){
      posts.map(post=>usersPosts.push(post))
      return res?.send(usersPosts.reverse())
    }else {
    }
  })
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, userFound) => {
    userFound
      ? bcrypt.compare(password, userFound.password, function (err, result) {
          result
            ? res.status(201).send({
                message: "User loggedin successfully",
                user: userFound,
              })
            : res.send({ err: "password is incorrect" });
        })
      : res.send({ err: "User not found. Create a new account" });
  });
});

app.post("/register", (req, res) => {
  const { fName, lName, email, password, date, month, year, gender } = req.body;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    const user = new User({
      fName: fName,
      lName: lName,
      email: email,
      password: hash,
      date: date,
      month: month,
      year: year,
      gender: gender,
    });
    User.findOne({ email: email }, (err, userFound) => {
      !userFound
        ? user.save((err) =>
            !err
              ? res.send({
                  message: "User registered successfully",
                  user: user,
                })
              : res.send(err)
          )
        : res.send({ message: "User already exists" });
    });
  });
});

app.post("/post", upload.single("image"), (req, res) => {
  let imgFile;
  if (req.file) {
    imgFile = req.file.filename;
  }
  const { caption, date, userId } = req.body;
  if (imgFile === undefined && caption == "") {
    //no image no caption
    res.status(401).send({ status: 401, message: "fill the data" });
  } else {
    let post;
    if (imgFile !== undefined && caption == "") {
      //image but no caption
      post = new Post({
        userId:userId,
        image: imgFile,
        date: date,
      });
      post.save();
    } else if (imgFile === undefined && caption !== "") {
      // no img but caption
      post = new Post({
        userId:userId,
        caption: caption,
        date: date,
      });
      post.save();
    } else {
      // both image and caption
      post = new Post({
        userId:userId,
        caption: caption,
        image: imgFile,
        date: date,
      });
      post.save();
    }
    console.log(post);
    User.findOneAndUpdate(
      { _id: userId },
      { $push: { posts: post } },
      { new: true },
      (err, user) => {
        if (err) {
          console.log("Something wrong when updating data!");
        } else {
          res.status(201).send({ status: 201, user: user });
        }
      }
    );
  }
});

app.post("/delete-post", (req, res) => {
  const { postId, userId } = req.body;
  Post.findOneAndDelete({_id: postId }, function (err, docs) {
    if (err){
        // console.log(err)
    }
    else{
        // console.log("Deleted User : ");
    }
    Post.find({userId:userId},(err,posts)=>{
      if(err){
        console.log(err)
      }else{
        User.findOneAndUpdate({_id:userId},{"$set": { posts: posts }},(err,user)=>{
          if(err){
            console.log(err);
          }else{
            res.send(user)
          }
        })
      }
    })
  });
  
});

app.post("/add-comment",(req,res)=>{
  const {userId,postId,comntInput,userName} = req.body;
  let userPosts, postsUserId;
   const cmntObj = {
    cmnt: comntInput,
    by: userId,
    userName:userName
   }
  Post.findOneAndUpdate(
    { _id: postId },
    { $push: { comments: cmntObj} },
    (err, post) => {
      if (!err) {
        postsUserId=post.userId
      } else {
        console.log(err);
      }
      Post.find({userId:postsUserId},(err,posts)=>{
        if(posts){
          User.findOneAndUpdate({_id:postsUserId},{"$set": { posts: posts }},(err,user)=>{
            if(err){
              console.log(err);
            }else{
              res.send(user)
            }
          })
        }else{
          console.log(err);
        }
      })
    }
  );
});

app.post("/delete-comment",(req,res)=>{
  const {userId,postId,cmnt,userName} = req.body;
  let userPosts, postsUserId;
   const cmntObj = {
    cmnt: cmnt,
    by: userId,
    userName:userName
   }
  console.log(cmntObj);
  
  Post.findOneAndUpdate({_id: postId },{ $pull: { comments: cmntObj} },(err,post)=>{
    if(err){
      console.log(err);
    }else{
      postsUserId=post.userId
    }
    Post.find({userId:postsUserId},(err,posts)=>{
      if(posts){
        User.findOneAndUpdate({_id:postsUserId},{"$set": { posts: posts }},(err,user)=>{
          if(err){
            console.log(err);
          }else{
            res.send(user)
          }
        })
      }else{
        console.log(err);
      }
    })
  })
});

app.post("/post-liked",(req,res)=>{
  const {userId,postId} = req.body;
  Post.findOne({_id:postId},(err,post)=>{
    if(post){
      if(post.likes.includes(userId)){
        res.status(200).send(post)
      }
    }else{
      console.log(err);
    }
  })
})

app.post("/add-like",(req,res)=>{
let userPosts, postsUserId;
const {userId,postId}=req.body;
Post.findOneAndUpdate({_id:postId},{ $push: { likes: userId} },(err,post)=>{
  if(!post){
    console.log(err);
  }else{
    postsUserId=post.userId
  }
  Post.find({userId:postsUserId},(err,posts)=>{
    if(posts){
      User.findOneAndUpdate({_id:postsUserId},{"$set": { posts: posts }},(err,user)=>{
        if(err){
          console.log(err);
        }else{
          res.send(user)
        }
      })
    }else{
      console.log(err);
    }
  })
})
})

app.post("/remove-like",(req,res)=>{
  let userPosts, postsUserId;
  const {userId,postId}=req.body;
  Post.findOneAndUpdate({_id:postId},{ $pull: { likes: userId} },(err,post)=>{
    if(!post){
      console.log(err);
    }else{
      postsUserId=post.userId
    }
    Post.find({userId:postsUserId},(err,posts)=>{
      if(posts){
        User.findOneAndUpdate({_id:postsUserId},{"$set": { posts: posts }},(err,user)=>{
          if(err){
            console.log(err);
          }else{
            res.send(user)
          }
        })
      }else{
        console.log(err);
      }
    })
  })
})

app.post("/search-user", (req, res) => {
  console.log("integrated successfully to search users");
  const searchusertext = Object.keys(req.body);
  const userfName =(searchusertext[0].charAt(0).toUpperCase()+searchusertext[0].substring(1,searchusertext[0].length));
  User.find({ fName: userfName }, (err, usermatched) => {
    if (usermatched) {
      console.log(usermatched);
      res.status(201).send(usermatched);
    }
  });
});

app.listen(3009, () => {
  console.log("server started on port :3009");
});

//register----->Done
//delete account----->
//login----->Done
//logout----->Done
//add pos----->Done
//delete post----->Done
//add comment to post-----> Done
//delete comment to post----->Done
//like the post-----> Done
//remove like of the post-----> Done
