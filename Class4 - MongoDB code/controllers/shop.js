const Product = require("../models/product");
const Order = require("../models/order");

// MongoDb
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));

  // Sequelize
  // exports.getProducts = (req, res, next) => {
  //   Product.findAll()
  //     .then((products) => {
  //       res.render("shop/index", {
  //         prods: products,
  //         pageTitle: "All Products",
  //         path: "/products",
  //       });
  //     })
  //     .catch((err) => console.log(err));

  // mysql2 way
  // Product.fetchAll()
  // .then(([rows,fieldData])=>{
  //   res.render('shop/product-list', {
  //         prods: rows,
  //         pageTitle: 'All Products',
  //         path: '/products'
  //       });
  // })
  // .catch(err=>console.log(err))
  // Files way
  // Product.fetchAll(products => {
  //   res.render('shop/product-list', {
  //     prods: products,
  //     pageTitle: 'All Products',
  //     path: '/products'
  //   });
  // });
};

exports.getProduct = (req, res, next) => {
  //  mongodb
  const prodId = req.params.productId; //find all returns here array in another method it return only one product
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));

  // using sequelize
  // const prodId = req.params.productId;//find all returns here array in another method it return only one product
  // Product.findAll({where:{id:prodId}})
  // .then((products)=>{

  //   res.render("shop/product-detail", {
  //         product: products[0],
  //         pageTitle: products[0].title,
  //         path: "/products",
  //       });
  //     }
  // )
  // .catch(err=>console.log(err))

  // ANother way using sequelize
  // const prodId = req.params.productId;
  // Product.findByPk(prodId).then((product) => {

  //   res.render("shop/product-detail", {
  //     product: product,
  //     pageTitle: product.title,
  //     path: "/products",
  //   });
  // }).catch(err=>console.log(err));
  // OLd code
  //   const prodId = req.params.productId;
  //   Product.findById(prodId)
  //   .then(([product])=>{
  //     res.render('shop/product-detail', {
  //           product: product[0],
  //           pageTitle: product.title,
  //           path: '/products'
  //   })
  // })
  //   .catch((err)=>{console.log(err)});

  // Oldest Code
  // Product.findById(prodId, product => {
  //   res.render('shop/product-detail', {
  //     product: product,
  //     pageTitle: product.title,
  //     path: '/products'
  //   });
  // });
};

exports.getIndex = (req, res, next) => {
  // USing sequelize
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
  // Product.fetchAll()
  // .then(([rows,fieldData])=>{
  //   res.render('shop/index', {
  //         prods: rows,
  //         pageTitle: 'Shop',
  //         path: '/'
  //       }); this was when files were used to store data mysql2
  // })
  // .catch(err=>console.log(err))
  // =============================== oldest files
  // Product.fetchAll(products => {
  //   res.render('shop/index', {
  //     prods: products,
  //     pageTitle: 'Shop',
  //     path: '/'
  //   });
  // });
};

exports.getCart = (req, res, next) => {

   //  mongoDb
   req.user
   .getCart()
     .then((products) => {
         res.render("shop/cart", {
           path: "/cart",
           pageTitle: "Your Cart",
           products: products,
         });
       })
       .catch((err) => console.log(err));
   }


  //  sequelize
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     return cart
  //       .getProducts() //becuse of this relation Cart.belongsToMany(Product,{through:CartItem});
  //       .then((products) => {
  //         res.render("shop/cart", {
  //           path: "/cart",
  //           pageTitle: "Your Cart",
  //           products: products,
  //         });
  //       })
  //       .catch((err) => console.log(err));
  //   })
  //   .catch((err) => console.log(err));
  //  File system
  // Cart.getCart((cart) => {
  //   Product.fetchAll((products) => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(
  //         (prod) => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render("shop/cart", {
  //       path: "/cart",
  //       pageTitle: "Your Cart",
  //       products: cartProducts,
  //     });
  //   });
  // });
// };

exports.postCart = (req, res, next) => {
  // mongoDb
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log('postCart-shop.js',result);
      res.redirect('/cart')
    })
    .catch((err) => console.log(err));

  // sequelize
  //   const prodId = req.body.productId;
  //   let fetchedCart;
  //   let newQuantity = 1;
  // req.user.getCart()
  // .then(cart=>{
  //   fetchedCart=cart;
  //  return cart.getProducts({where:{id:prodId}});
  // })
  // .then(products=>{
  //   let product;
  //   if(products.length>0){
  //     product= products[0]
  //   }

  //   if(product){
  //     const oldQuantity =product.cartItem.quantity;
  //     newQuantity= oldQuantity+1;
  //     return product;
  //   }
  //   return Product.findByPk(prodId);
  //   // .then(product=>{
  //   //   return fetchedCart.addProduct(product,{through:{quantity:newQuantity}})  // because of many to many
  //   // }).catch(err=>console.log(err));
  // })
  // .then(product=>{
  //   return fetchedCart.addProduct(product,{through:{quantity:newQuantity}})
  // })
  // .then(()=>{
  //   res.redirect('/cart')
  // })
  // .catch(err=>console.log(err))

  // file way
  //   const prodId = req.body.productId;
  //   Product.findById(prodId, (product) => {
  //     Cart.addProduct(prodId, product.price);
  //   });
  //   res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {

  // mongoDb 
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then((result) => {
      console.log('postCartDeleteProduct', result);
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));

  // sequleize
  // const prodId = req.body.productId;
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     return cart.getProducts({ where: { id: prodId } });
  //   })
  //   .then((products) => {
  //     const product = products[0];
  //     return product.cartItem.destroy();
  //   })
  //   .then((result) => {
  //     res.redirect("/cart");
  //   })
  //   .catch((err) => console.log(err));

  // using file
  // Product.findById(prodId, (product) => {
  //   Cart.deleteProduct(prodId, product.price);
  //   res.redirect("/cart");
  // });
};

exports.postOrder = (req, res, next) => {
// MongoDb 
req.user.addOrder()
.then((result) => {
    res.redirect("/orders");
  })
  .catch((err) => console.log(err));

  // Sequelize 
  // let fetchedCart;
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     fetchedCart = cart;
  //     return cart.getProducts();
  //   })
  //   .then((products) => {
  //     return req.user
  //       .createOrder()
  //       .then((order) => {
  //         return order.addProduct(
  //           products.map((product) => {
  //             product.orderItem = { quantity: product.cartItem.quantity };
  //             return product;
  //           })
  //         );
  //       })
  //       .catch((err) => console.log(err));
  //   })
  //   .then((result) => {
  //     return fetchedCart.setProducts(null);
  //   })
  //   .then((result) => {
  //     res.redirect("/orders");
  //   })
  //   .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  // mongodb 
  req.user
  .getOrders()
  .then((orders) => {
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders: orders,
    });
  })
  .catch((err) => console.log(err)) ;
  
  // Sequelize 
  // req.user
  //   .getOrders({ include: ["products"] })
  //   .then((orders) => {
  //     res.render("shop/orders", {
  //       path: "/orders",
  //       pageTitle: "Your Orders",
  //       orders: orders,
  //     });
  //   })
  //   .catch((err) => console.log((err) => console.log(err)));
};

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     path: "/checkout",
//     pageTitle: "Checkout",
//   });
// };
