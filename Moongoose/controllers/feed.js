const  ProductModel = require('../models/product') 

exports.getFeeds = async(req,res,next)=>{
    console.log(req)
    const products = await ProductModel.find().lean()
    if(products.length>0){

        res.status(200).json({
            products:products
        })
    }else{
        res.status(400).json({
            message:'No products found'}
        )
    }
}

exports.postFeeds = (req,res,next)=>{
    const title= req.body.title
    // const description= req.body.description
    const amount = Math.floor(Math.random() * 10)
    ProductModel.create({title:title,price:amount})
    .then(rs=>res.status(201).json({message:`Post was created successfully with tilte ${title} and Price ${amount}`,}))
    .catch((err)=>res.status(400).json({
        message:err.message}
    ))

}


// const postFD = (req, res, next)=>{

// }
// module.exports.postFeeds = postFD`