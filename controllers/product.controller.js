const Product=require('../model/Product');
const {getProductsService,postProductsService}=require('../Services/product.service');
exports.getProducts=async(req,res,next)=>{
    try{
      console.log(req.query.limit);
      const limit= req.query.limit;
      const a=await getProductsService(limit);
      res.status(200).json({
        status:'success',
        data:a
      });
    }catch(err){
      res.status(400).json({
        status:'fail',
        message:'can not get data',
        error:err.message
      })
    }
  }
  exports.createProduct=async (req, res, next) => {
    try {
      const data=req.body;
      const product = new Product(req.body);
      const productPost=await postProductsService(product);
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
  }