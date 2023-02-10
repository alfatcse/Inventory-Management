const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const productRoute = require('./routes/product.route');
app.use(express.json());
app.use(cors());

// productSchema.pre("save", function (next) {
//   console.log("Before saving Data");
//   if (this.quantity === 0) {
//     this.status = "out-of-stock";
//   }
//   next();
// });
// productSchema.post("save",function(doc,next){
//   console.log('after saving data')
//   next();
// });

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});
app.use("/api/v1/product", productRoute);

module.exports = app;
