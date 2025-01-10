const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart =  cart ? cart : (cart = { items: [] }); //{items:[]}
    // this.cart =  cart ; //{items:[]}
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };

    // const updatedCart = {items:[{...product, quantity:1}]};
    // const updatedCart = {items:[{productId: new ObjectId(product._id), quantity:1}]}; tweaked of upper one
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    console.log('getCart',this.cart)
    const db = getDb();
    const productIds = this.cart.items.map((i) => i.productId);
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === p._id.toString();
            }).quantity
          };
        });
      });
  }

  deleteItemFromCart(productId){
    const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId.toString());
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: {items : updatedCartItems} } }
      );
  };

  addOrder(){

    const db = getDb();
    return this.getCart()
    .then(products=>{
      const order = {
        items: products,
        user : {
          _id: new ObjectId(this._id),
          name: this.name,
        }
      }
      return db.collection('orders').insertOne(order)
    })
    .then(result=>{
      this.cart = {items: []};
      return db
      .collection("users")
      .updateOne(
          { _id: new ObjectId(this._id) },
          { $set: { cart: {items:[]} } }
        );
    })
  }

    // Mongodb but need tweaks to oncorporate more info 
  //   const db = getDb();
  //   return db.collection('orders').insertOne(this.cart)
  //   .then(result=>{
  //     this.cart = {items: []};
  //     return db
  //     .collection("users")
  //     .updateOne(
  //         { _id: new ObjectId(this._id) },
  //         { $set: { cart: {items:[]} } }
  //       );
  //   })
  // }


  getOrders() { 
    const db = getDb();
    return db.collection('orders').find({'user._id': new ObjectId(this._id)}).toArray();
  }

  static findById(userId) {
    const db = getDb();
    // db.collection('users').find({_id : new ObjectId(userId)}).next(); can also use this find gives cursor
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        console.log("user", user);
        return user;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = User;

// const {Sequelize} = require('sequelize')
// const sequelize =require('../util/database');

// const User=sequelize.define('user',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true
//     },
//     name:{
//         type:Sequelize.STRING,
//         allowNull:false,
//     },
//     email:{
//         type:Sequelize.STRING,
//         allowNull:false,},
// })

// module.exports = User
