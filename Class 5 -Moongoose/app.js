const express = require('express');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');
const app = express();
app.use(express.json())
app.use((req,res,next)=>{
    console.log('first')
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin, Authorization, X-Requested-With')
    next()
})

app.use(feedRoutes)
mongoose.connect('mongodb+srv://ubisage:Cisco123@classes.e4n9b.mongodb.net/?retryWrites=true&w=majority&appName=classes')
.then((res)=>console.log('Connection was established'))
.catch((err)=>{console.error(err)})
app.listen(9005)