const express = require('express');

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

app.listen(8080)