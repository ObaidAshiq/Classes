const express = require("express");
const mongoose = require("mongoose");
const app = express();
const feedRoutes = require("./routes/feed");

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Origin,Authorization"
  );
  next();
});
app.use((req, res, next) => {
  console.log(req.body);
  next();
});
mongoose
  .connect(
    "mongodb+srv://zuhaibrather2:Rather78619877@classes.grjbe.mongodb.net/?retryWrites=true&w=majority&appName=Classes"
  )
  .then((res) => console.log("Connection to mongo db was sucessful"))
  .catch((err) => {
    console.error(error);
  });
app.use(feedRoutes);

app.listen(4000);
