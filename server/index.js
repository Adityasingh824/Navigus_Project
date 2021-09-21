const express = require("express");
const app = express();
app.get('/',(req,res)=>{
    res.send('Hello Aditya Lets do it');
});

app.listen(5000,()=>{
    console.log('Server is listening on Port 5000');
})