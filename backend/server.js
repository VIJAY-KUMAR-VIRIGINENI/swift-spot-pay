const express=require('express');   
const dotenv=require('dotenv').config(); 
const {errorHandler}=require('./middleware/errorMiddleware');
const PORT=process.env.PORT || 5000;
const colors=require('colors');
const connectDB=require('./config/db.js');



connectDB();
const app=express();
app.use(express.json());
app.use(errorHandler);
app.use(express.urlencoded({extended:false}));
app.get('/',(req,res)=>{
    res.status(200).json({message:'Welcome to the server '});
});

app.use('/api/users',require('./routes/userRoutes'));
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));