const path = require("path");
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productsRoutes = require("./routes/products");
const userRoutes = require("./routes/user");

const MONGODB_URI=`mongodb+srv://hari:PAPrAV2t5n0GTwAy@cluster0-uditx.mongodb.net/art-shoppe`;
const PORT = process.env.PORT || 5000;


const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("./images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/products",productsRoutes);
app.use("/api/user", userRoutes);



mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(PORT,()=>{
      console.log(`app serving at port  ${PORT}`);
    })
  })
  .catch((err) => {
    console.log("Connection to DB failed! ",err);
  });
