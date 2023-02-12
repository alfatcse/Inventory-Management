const {
  createBrandService,
  getBrandService,
  getBrandByIdService,
} = require("../Services/brand.service");

exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Created",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Can not create brand",
    });
  }
};
exports.getBrands = async (req, res, next) => {
  try {
    const brands = await getBrandService();
    res.status(200).json({
      status: "Success",
      message: "Created",
      data: brands,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Can not get brand",
    });
  }
};
exports.getBrandsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await getBrandByIdService(id);
    if(!brand){
        res.status(200).json({
            status: "Fail",
            message: "Can not find with this ID",
            
          });
    }
    res.status(200).json({
      status: "Success",
      message: "Created",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Can not get brand",
    });
  }
};
