const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const productSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    title:String,
    price:{
        type:Number,
        required:true
    }
})
productSchema.methods.speak = function speak(){
    const greeting = this.title
    ? 'Meow name is ' + this.title
    : 'I don\'t have a name';
  console.log(greeting);
}
// const Product = mongoose.model('Product', productSchema)
// await Product.create({title:'String',price:1}) // Directly db
//  //OR
// const product1 = new Product({title:'String',price:1})//In memory 
// product1.save(); //pass this to DB 
// const product2 = new Product({title:'String',price:1})


module.exports = mongoose.model('Product', productSchema)

