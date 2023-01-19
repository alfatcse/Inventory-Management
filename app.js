const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(express.json());
app.use(cors());
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide a Name"],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at Least 3 Characters"],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Can not be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "pcs", "litre"],
        message: "Unit value must be kg/pcs/litre ",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "quantity can not be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Quantity must be an integer",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can not be other",
      },
    },
    // supplier:{
    //   type:mongoose.Schema.Types.ObjectId,
    //   ref:"Supplier"
    // },
    // categories:[{
    //   name:{
    //     type:String,
    //     required:true
    //   },
    //   _id:mongoose.Schema.Types.ObjectId
    // }]
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});
app.post("/api/v1/product", async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.status(200).json({
      status: "success",
      message: "Data inserted",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Data not inserted",
      error: err.message,
    });
  }
});
module.exports = app;
