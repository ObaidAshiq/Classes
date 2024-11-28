const express = require('express');
const router = express.Router();
// Request handler for '/' path in url as having POST http method
router.get('/',(req,res,next)=>{
   return  res.send('<h1>Hello from first middleware</h1>')
})

module.exports = router