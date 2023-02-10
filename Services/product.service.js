const Product = require("../model/Product");
exports.getProductsService = async (filter, queries) => {
  const products = await Product.find({})
    .select(queries.fields)
    .sort(queries.sortBy);
  return products;
};
exports.postProductsService = async (data) => {
  const product = await Product.create(data);
  return product;
};
exports.updateProductService = async (id, data) => {
  const result = await Product.updateOne(
    { _id: id },
    { $inc: data },
    { runValidators: true }
  );
  // const product=await Product.findById(id);
  // const result=await product.set(data).save();
  return result;
};
exports.bulkUpdateProductService = async (data) => {
  // const result =await Product.updateMany({_id:data.ids},data.data,{runValidators:true});
  const products = [];
  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });
  const result = await Promise.all(products);
  return result;
};
exports.deleteProductByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};
exports.bulkDeleteProductService = async (ids) => {
  const result = await Product.deleteMany({ _id: ids });
  return result;
};
