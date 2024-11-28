const express = require('express');
const router = express.Router();
// router acts as router object that has some predined functions, similar to application, but is a small version of IDBTransaction, used for handling routes, and the middleware functions 

// Request handler for '/admin/add-product' path in url as having GET http method
router.get('/add-product',(req,res,next)=>{
     return res.send('<form action="/admin/add-product" method="POST"><input type="text" name="firstname"/> <button>Send</button></form>')

})
// Request handler for '/admin/add-product' path in url as having POST http method
router.post('/add-product',(req,res,next)=>{
    return res.redirect('/') //Redirecting it to '/' path, which is handled in shop, it will not directly go to shop, but first request or control will go via app-> parse->shopRoutes.NOTE will skip adminRoutes because of it having path filter of '/admin  
})

// exporting the router as a middleware function 
module.exports = router


