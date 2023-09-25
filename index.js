const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserModel = require('./models/User')
const PORT = process.env.PORT || 3001



app.use(cors())
app.use(express.json())
// mongoose.connect('mongodb://localhost:27017/crud')
dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to Mongo");
    app.listen(PORT, () => {
      console.log("Backend server is ready");
    });
  })
  .catch(error => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get('/',(req,res)=>{
    UserModel.find()
    .then(users =>res.json(users))
    .catch(err=>res.json(err))
})
app.post('/create',(req,res)=>{
    UserModel.create(req.body)
    .then(user =>res.json(user))
    .catch(err=>res.json(err))
})
app.put('/update/:id',(req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id},{
        name:req.body.name,
        email:req.body.email,
        age:req.body.age
    }).then(user =>res.json(user))
    .catch(err=>res.json(err))
})
app.delete('/deleteUser/:id',(req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(response =>res.json(response))
    .catch(err=>res.json(err))
})
// app.listen(PORT, () =>{
//     console.log("Server is running")
// })
  
  