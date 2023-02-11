const Brand = require("../model/Brands");

exports.createBrandService = async (data) => {
    const result=await Brand.create(data);
};
