const { ObjectId } = require("mongodb");

const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl,id,userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id =id ? new ObjectId(id) : null;
    this.userId =userId;
  }

  save() {
    const db = getDb(); //this returns the instance of the db that we connectd to
    let dbOp; 
    if(this._id){
      dbOp = db
      .collection("products")
      .updateOne({_id: this._id},{$set:this});
    }else{
      dbOp = db
      .collection("products")
      .insertOne(this);
    }
    return dbOp.then((result) => console.log(result))
      .catch((err) => console.log("modal/product", err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log("products", products);
        return products;
      })
      .catch((err) => console.log(err));
  }

  static findById (prodId){
    const db = getDb();
    // return db.collection('products').find({_id: new mongodb.ObjectId(prodId)})
    return db.collection('products').find({_id: new ObjectId(prodId)}).next()
    .then( product=>{return product})
    .catch(err=>console.log(err))
  }


  static deleteById (prodId){
    const db =getDb();
    return db.collection('products').deleteOne({_id: new ObjectId(prodId)})
    .then(result=>console.log('Deleted'))
    .catch(err=>console.log(err))
  }
}

// Sewuelize
// const Product = sequelize.define('product',{
//   id:{
//     type:Sequelize.INTEGER,
//     allowNull:false,
//     primaryKey:true,
//     autoIncrement:true,
//   },
//   title: Sequelize.STRING,
//   price:{
//     type:Sequelize.DOUBLE,
//     allowNull:false,
//   },
//   imageUrl:{
//     type:Sequelize.STRING,
//     allowNull:false,
//   },
//   description:{
//     type:Sequelize.STRING,
//     allowNull:false,
//   },
// });
module.exports = Product;
