const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();


const userRoutes=require('./routes/user.routes');

const authRoutes=require('./routes/auth.routes');

const app = express();


app.use(express.json());

app.use('/users',userRoutes);
app.use('/auth',authRoutes);



mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => console.log(err));



app.listen(process.env.PORT ,() =>{
    console.log(`Server running on port `+process.env.PORT);
})