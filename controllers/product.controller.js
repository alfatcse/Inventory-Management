const Product = require("../model/Product");
const {
  getProductsService,
  postProductsService,
  updateProductService,
  bulkUpdateProductService,
  deleteProductByIdService,
  bulkDeleteProductService,
} = require("../Services/product.service");
exports.getProducts = async (req, res, next) => {
  try {
    console.log(req.query);
    const queries = {};
    const filter = { ...req.query };
    // let filterString = JSON.stringify(filter.price);
    // filterString = filterString.replace(
    //   /\b(gt|gte|lt|lte)\b/g,
    //   (match) => `$${match}`
    // );
    // queries.greterFilter = JSON.parse(filterString);
    //  console.log("ger", queries);
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.map((field) => delete filter[field]);
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      // console.log(sortBy);
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      // console.log(fields);
    }
    if(req.query.page)
    {
      const {page=0,limit=2}=req.query;
      const skip=(page-1)*parseInt( limit);
      queries.skip=skip;
      queries.limit=parseInt(limit);
    }
    console.log(queries);
    const a = await getProductsService(filter, queries);
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
    const { id } = req.params;
    const productUpdate = await updateProductService(id, req.body);
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
exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const productUpdate = await bulkUpdateProductService(req.body);
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
exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productUpdate = await deleteProductByIdService(id);
    res.status(200).json({
      status: "success",
      message: "Data deleted",
      data: productUpdate,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Product not deleted",
      error: err.message,
    });
  }
};
exports.deleteProductByIdBulk = async (req, res, next) => {
  try {
    const { ids } = req.body;
    console.log(ids);
    const productDelete = await bulkDeleteProductService(ids);
    if (!productDelete.deletedCount) {
      return res.status(400).json({
        status: "fail",
        error: "Can not delete",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Data deleted",
      data: productDelete,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Product not deleted",
      error: err.message,
    });
  }
};
exports.fileUpload=async (req,res)=>{
  try{
    res.status(200).json(req.files)
  }catch(error){

  }
}
