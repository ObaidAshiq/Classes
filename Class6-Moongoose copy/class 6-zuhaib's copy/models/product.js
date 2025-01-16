const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Product", productSchema);

const newProductSchema = new Schema({
  name: String,
});

newProductSchema.methods.speak = function speak() {
  const item = this.name
    ? "The product name is " + this.name
    : "No product found";

  console.log(item);
};

const newProductModel = mongoose.model("newProduct", newProductSchema);

const iPhone = new newProductModel({ name: "iPhone" });
iPhone.save();
iPhone.speak();
