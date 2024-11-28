const http = require('http');
//adminRoutes and shopRoutes are middleware function | objects that we exported from respective files
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const express = require('express');

// app is like an appliation with various features, able to create middleware and also able to start the server , Has many function like use, listen 
const app = express();

app.use(express.urlencoded({ extended: false })) // Used to parse the url encoded body (i.e data from forms - usually)

app.use('/admin',adminRoutes) //use here takses 2 arguments, 1st is path, to which it will filter to, 2nd being the function it will execute for this filtered path
app.use(shopRoutes) // here shop routes will be executed for any path, but internally it looks for '/' path only and it will execute after the first

// This will be executed for all the paths, and only when if we havent handled that path by other handler 
app.use((req,res,next)=>{
    console.log('first')
    res.send('<h1>Page not found</h1>')
})


// Server is running on port 3000 and will not stop, only if we manually stop it using process.exit() or by an error
app.listen(3000)