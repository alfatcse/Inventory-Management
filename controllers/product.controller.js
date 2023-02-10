const Product = require("../model/Product");
const {
  getProductsService,
  postProductsService,
  updateProductService
} = require("../Services/product.service");
exports.getProducts = async (req, res, next) => {
  try {
    console.log(req.query.limit);
    const limit = req.query.limit;
    const a = await getProductsService(limit);
    res.status(200).json({
      status: "success",
      data: a,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "can not get data",
      error: err.message,
    });
  }
};
exports.createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const productPost = await postProductsService(product);
    console.log(productPost);
    res.status(200).json({
      status: "success",
      message: "Data inserted",
      data: productPost,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Data not inserted",
      error: err.message,
    });
  }
};
exports.updateProduct = async (req, res, next) => {
  try {
      const {id}=req.params;
      const productUpdate=await updateProductService(id,req.body);
      res.status(200).json({
        status: "success",
        message: "Data updated",
        data: productUpdate,
      });
  } catch (err) {
      res.status(400).json({
      status: "fail",
      message: "Product not Updated",
      error: err.message,
    });
  }
};
