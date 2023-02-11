const express = require('express');
const brandController=require('../controllers/brand.controller');
const router=express.Router();

router.post('/',brandController.createBrand);

module.exports=router;