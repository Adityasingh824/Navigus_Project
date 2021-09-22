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
    subjectQuestions:{
        type:Object,
    },
    subjectAnswers:{
        type:Object,
    },

});

const User = new mongoose.model("User",userSchema);
const Subject = new mongoose.model("Subject",subjectSchema);


app.get('/v1/user', (req, res) => {
  User.find({},function (err, users){
      if(err){
        console.log(err);
      }else{
        if(users.length>0)
        {
          res.json(users);
        }
      }
  })
});

app.post('/v1/subject/create',function(req,res){
  const newCollection = new Subject
  ({
      subjectName:req.body.subjectName,
      subjectQuestions:req.body.subjectQuestions,
      subjectAnswers:req.body.subjectAnswers
  })
  newCollection.save(function(err){
      if(err){
          console.log(err);
      }else{
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
            res.send(newCollection).status(200);
        }
    })
  });

// app.get('/v1/attributes/:id', (req, res) => {
//   const id_=req.params.id;
//   Attribute.findById(id_, (err, attribute) => {
//       if(err){
//         console.log(err);
//       }else{
//         if(attribute)
//         {
//           res.json(attribute);
//         }
//       }
//   })
// });

// app.patch('/v1/attributes/:id',function(req,res){
//   const id_=req.params.id;
//   const update=req.body;
//   console.log(update);
//   Attribute.findByIdAndUpdate(id_,update,{new:true},function(err){
//     if(err){
//       console.log(err);
//     }else{
//       res.send("All is updated").status(200);
//     }
//   })
// })



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})