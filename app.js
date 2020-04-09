const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require("body-parser");

mongoose.connect('mongodb://localhost:27017/exerciseTracker',{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("DB connected");
});
mongoose.connection.on('error',err=>{
    console.log("Db connection err",err.message);
})

const app=express();
app.use(bodyParser.json());
app.use(cors()); 

const exerciseRouter=require('./router/exerciseRouter');
const userRouter=require('./router/userRouter');

app.use('/exercise',exerciseRouter);
app.use('/user',userRouter);


const port=5000;
app.listen(port,()=>{
    console.log("Server is listening on",port);
});

