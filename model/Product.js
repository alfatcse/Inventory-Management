const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide a Name"],
      trim: true,
      lowercase: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at Least 3 Characters"],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    imageURLs: [
      {
        type: String,
        required: true,
        validate: {
          validator: (value) => {
            if (Array.isArray(value)) {
              return false;
            }
            let isValid = true;
            value.forEach((url) => {
              if (!validator.isURL(url)) {
                isValid = false;
              }
            });
          },
          message: "Please provide valid image urls",
        },
      },
    ],
    category: {
      type: String,
      required: true,
    },
    brand:{
      name:{
        type:String,
        required:true,
      },
      id:{
        type:ObjectId,
        ref:"Brand",
        required:true
      }
    },
    // price: {
    //   type: Number,
    //   required: true,
    //   min: [0, "Can not be negative"],
    // },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "pcs", "litre", "bag"],
        message: "Unit value must be kg/pcs/litre/bag",
      },
    },
    // quantity: {
    //   type: Number,
    //   required: true,
    //   min: [0, "quantity can not be negative"],
    //   validate: {
    //     validator: (value) => {
    //       const isInteger = Number.isInteger(value);
    //       if (isInteger) {
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     },
    //   },
    //   message: "Quantity must be an integer",
    // },
    // status: {
    //   type: String,
    //   required: true,
    //   enum: {
    //     values: ["in-stock", "out-of-stock", "discontinued"],
    //     message: "status can not be other",
    //   },
    // },
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
module.exports = Product;
