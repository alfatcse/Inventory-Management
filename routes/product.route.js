const express = require('express');
const router=express.Router();
const multer=require("multer");
const productController=require('../controllers/product.controller');

const uploader=multer({dest:"images/"});

router.route("/file-upload")

router.route('/bulk-update').patch(productController.bulkUpdateProduct)
router.route('/bulk-delete').delete(productController.deleteProductByIdBulk)

router.route('/')
.get(productController.getProducts)
.post(productController.createProduct)

router.route('/:id').patch(productController.updateProduct)
.delete(productController.deleteProductById)


module.exports=router