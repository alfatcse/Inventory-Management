const express = require('express');
const router=express.Router();
const productController=require('../controllers/product.controller');
const uploader=require('../middleware/Uploader');

router.post("/file-upload",uploader.array("image"),productController.fileUpload);//for single file -> uploader.single

router.route('/bulk-update').patch(productController.bulkUpdateProduct)
router.route('/bulk-delete').delete(productController.deleteProductByIdBulk)

router.route('/')
.get(productController.getProducts)
.post(productController.createProduct)

router.route('/:id').patch(productController.updateProduct)
.delete(productController.deleteProductById)


module.exports=router