const express = require('express')
const bodyParser = require('body-parser') 
const mongoose = require("mongoose"); 
const cors = require('cors');


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const port = 5000

mongoose.connect("mongodb+srv://Aditya:Aditya%40123@cluster0.ankjj.mongodb.net/Database?retryWrites=true&w=majority");

const userSchema= new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true
    },
    userPassword:{
        type:String,
        required:true
    },

});

const subjectSchema= new mongoose.Schema({
    subjectName:{
        type:String,
        required:true
    },
    // subjectQuestions:{
    //     type:Object,
    // },
    // subjectAnswers:{
    //     type:Object,
    // },

});

const User = new mongoose.model("User",userSchema);
const Subject = new mongoose.model("Subject",subjectSchema);

app.get('/v1/subject', (req, res) => {
    Subject.find({},function (err, subjects){
        if(err){
          console.log(err);
        }else{
          if(subjects.length>0)
          {
            res.json(subjects);
          }
        }
    })
  });

app.post('/v1/user/login', (req, res) => {
  console.log(req.body);
  User.findOne({userEmail:req.body.userEmail},function (err, user){
    console.log(user);
      if(err){
        console.log(err);
      }else{
          res.json(user);
      }
  })
});

app.post('/v1/subject/create',function(req,res){
  const newCollection = new Subject
  ({
      subjectName:req.body.subjectName,
    //   subjectQuestions:req.body.subjectQuestions,
    //   subjectAnswers:req.body.subjectAnswers
  })
  newCollection.save(function(err){
      if(err){
          console.log(err);
      }else{
          console.log("Hii");
          res.send(newCollection).status(200);
      }
  })
});

app.post('/v1/user',function(req,res){
    const newCollection = new User
    ({
        userType:req.body.userType,
        userEmail:req.body.userEmail,
        userName:req.body.userName,
        userPassword:req.body.userPassword,
    })
    newCollection.save(function(err){
        if(err){
            console.log(err);
        }else{
            //res.send('Hii Boy');
            res.send(newCollection).status(200);
        }
    })
});

app.get('/v1/user',function(req,res){
  newCollection.save(function(err){
      if(err){
          console.log(err);
      }else{
          //res.send('Hii Boy');
          res.send(newCollection).status(200);
      }
  })
});

app.delete('/v1/subject/delete/:id',function(req,res){
  Subject.findByIdAndDelete(req.params.id).then((subject) => {
    if (!subject) {
        return res.status(404).send();
    }
    res.send(subject);
  }).catch((error) => {
      res.status(500).send(error);
  })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})