const Product = require("../model/Product");
exports.getProductsService = async (limit) => {
  console.log(limit);
  const products = await Product.find({}).limit(+limit);
  return products;
};
exports.postProductsService=async (data)=>{
   const product = await Product.create(data);
   return product;
}