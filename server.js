const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const userRoutes=require('./src/routes/userRoutes');
dotenv.config();


const app=express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


try{

    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(()=>console.log('MongoDB connected'));
}


  catch(error){console.error("error connecting to mongodb",error)};


  app.use('/api/user',userRoutes);


app.listen(PORT,()=>{
    console.log(`runnig on ${PORT}`);
})