const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const productSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    }
})

// const Product = mongoose.model('Product', productSchema)
// await Product.create({title:'String',price:1}) // Directly db
//  //OR
// const product1 = new Product({title:'String',price:1})//In memory 
// product1.save(); //pass this to DB 
// const product2 = new Product({title:'String',price:1})


module.exports = mongoose.model('Product', productSchema)

