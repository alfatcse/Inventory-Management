const Brand = require("../model/Brands");

exports.createBrandService = async (data) => {
    console.log(data);
    const result=await Brand.create(data);
    return result;
};
exports.getBrandService=async()=>{
    console.log('get brand');
    const brands=await Brand.find({}).populate('products');
    return brands;
}
exports.getBrandByIdService=async(id)=>{
    const brand=await Brand.findOne({_id:id});
    return brand;
}
