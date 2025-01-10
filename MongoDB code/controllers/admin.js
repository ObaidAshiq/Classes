const { Sequelize } = require("sequelize");
const Product = require("../models/product");
const { ObjectId } = require("mongodb");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};


// mongo db 
exports.postAddProduct = (req, res, next) => {
  // Association with user 2 aways !st
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, price, description, imageUrl, null,req.user._id);

    product
    .save()
    .then((result) => {
      console.log('result',result);
      res.redirect("/admin/products");
    })
    .catch((err) => console.log('Hi',err));
};


// Sequelize
// exports.postAddProduct = (req, res, next) => {
//   // Association with user 2 aways !st
//   const title = req.body.title;
//   const imageUrl = req.body.imageUrl;
//   const price = req.body.price;
//   const description = req.body.description;

//   req.user
//     .createProduct({
//       title: title,
//       imageUrl,
//       price,
//       description,
//     })
//     .then((result) => {
//       console.log(result);
//       res.redirect("/admin/products");
//     })
//     .catch((err) => console.log(err));
// };


//   // Association with user 2 aways !st
//   const title = req.body.title;
//   const imageUrl = req.body.imageUrl;
//   const price = req.body.price;
//   const description = req.body.description;
//   Product.create({
//     title: title,
//     imageUrl,
//     price,
//     description,
//     userId:req.user.id //userId is data field in db that was created, req.user is swquelize obj with both data of user and helper methods
//   })
//     .then((result) => {
//       console.log(result);
//       res.redirect("/admin/products");
//     })
//     .catch((err) => console.log(err));
// };

// Sequelize
// const title = req.body.title;
// const imageUrl = req.body.imageUrl;
// const price = req.body.price;
// const description = req.body.description;
//   Product.create({
//     title: title,
//     imageUrl,
//     price,
//     description,
//   })
//     .then((result) => {
//       console.log(result);
//       res.redirect("/admin/products");
//     })
//     .catch((err) => console.log(err));
// };
// const product = new Product(null, title, imageUrl, description, price);
// product.save()
// .then(()=>{
//   res.redirect('/');
// })
// .catch(err=>console.log(err))
// // product.save();
// // res.redirect('/');

// MongoDb 
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then(product=>{
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  })
    .catch((err) => console.log(err));
}

// Sequelize
// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect("/");
//   }
//   const prodId = req.params.productId;
//   req.user.getProducts({where:{id:prodId}})
//   .then(products=>{
//     const product =products[0];
//     if (!product) {
//       return res.redirect("/");
//     }
//     res.render("admin/edit-product", {
//       pageTitle: "Edit Product",
//       path: "/admin/edit-product",
//       editing: editMode,
//       product: product,
//     });
//   })
//     .catch((err) => console.log(err));

  //same as above but above has special if we want to display produc repected to th elogged in user, i.e fo now only 1 user i.i ubi
  // const editMode = req.query.edit;
  // if (!editMode) {
  //   return res.redirect("/");
  // }
  // const prodId = req.params.productId;
  // Product.findByPk(prodId)
  //   .then((product) => {
  //     if (!product) {
  //       return res.redirect("/");
  //     }
  //     res.render("admin/edit-product", {
  //       pageTitle: "Edit Product",
  //       path: "/admin/edit-product",
  //       editing: editMode,
  //       product: product,
  //     });
  //   })
  //   .catch((err) => console.log(err));
  // Product.findById(prodId, product => {
  //   if (!product) {
  //     return res.redirect('/');
  //   }
  //   res.render('admin/edit-product', {
  //     pageTitle: 'Edit Product',
  //     path: '/admin/edit-product',
  //     editing: editMode,
  //     product: product
  //   });
  // });
// };

// For particular user it can be kept as it isFinite, we will post it only when we are able to edit that product whic means user has this product 

// MongoDb 
exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    const updatedImageUrl = req.body.imageUrl;
  
    const product = new Product(updatedTitle,updatedPrice,updatedDesc,updatedImageUrl, prodId)
      product.save()
      .then((result) => {
        console.log("Updated product");
        res.redirect("/admin/products");
      })
      .catch((err) => console.log(err));
 }


// sequelize 
// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedPrice = req.body.price;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedDesc = req.body.description;

//   Product.findByPk(prodId)
//     .then((product) => {
//       product.title = updatedTitle;
//       product.price = updatedPrice;
//       product.imageUrl = updatedImageUrl;
//       product.description = updatedDesc;
//       // Instead of nesting promises we can return it and addd other then block to this then block
//       // product.save()
//       // .then()
//       // .catch(err=>console.log(err))
//       return product.save();
//     })
//     .then((result) => {
//       console.log("Updated product");
//       res.redirect("/admin/products");
//     })
//     .catch((err) => console.log(err));

  // Old way possibly file
  // const updatedProduct = new Product(
  //   prodId,
  //   updatedTitle,
  //   updatedImageUrl,
  //   updatedDesc,
  //   updatedPrice
  // );
  // updatedProduct.save();
  // res.redirect('/admin/products');
// };



// MongoDb
exports.getProducts = (req, res, next) => {
    Product.fetchAll().then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "admin/products",
      });
    })
    .catch((err) => console.log(err));
  }

// Sequelize
// exports.getProducts = (req, res, next) => {
//   req.user.getProducts()//get the products related to that user
//   Product.findAll()//sequelize showing all products without( the user Restriction i.e only those products thats asscociated to that user)
//     .then((products) => {
//       res.render("admin/products", {
//         prods: products,
//         pageTitle: "Admin Products",
//         path: "admin/products",
//       });
//     })
//     .catch((err) => console.log(err));
  // Old code
  // Product.fetchAll(products => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   });
  // });
// };

//MongoDb
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId)
    .then((result) => {
      console.log('Destroyed he product');
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
  };
// Sequelize
// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
  //  One way to this in sequelize
  // Product.destroy({where:{id:prodId}}).then().catch()..;
  // Another way
  // Product.findByPk(prodId)
  //   .then((product) => {
  //     return product.destroy();
  //   })
  //   .then((result) => {
  //     console.log(result);
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // Old way
  // Product.deleteById(prodId);
  // res.redirect('/admin/products');
// };
