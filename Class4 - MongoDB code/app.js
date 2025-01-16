  const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { Sequelize } = require('sequelize');

//testing that it connected to our products table

// db.execute('SELECT * FROM products')
//   .then(result => {
//     console.log(result[0], result[1]);
//   })
//   .catch(err => {
//     console.log(err);
//   });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
  User.findById("653d0a782a33f9ac4f1d994a")
  .then(user=>{
    req.user=new User(user.name, user.email, user.cart , user._id);
    next();
  }).catch(err=> console.log(err));

  // on user we cant access User models methods that is why above
// app.use((req,res,next)=>{
//   User.findById("653d0a782a33f9ac4f1d994a")
//   .then(user=>{
//     req.user=user;
//     next();
//   }).catch(err=> console.log(err));
  // Sequelize
  // User.findByPk(1)
  // .then(user=>{
  //   req.user=user;
  //   next();
  // }).catch(err=> console.log(err))
  // next();
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// mongo connect requires a callback function which will get client 
mongoConnect(() =>{
  app.listen(4000);
  console.log('APP runing on localhost:4000')
})

