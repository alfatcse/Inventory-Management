const { createBrandService } = require("../Services/brand.service");

exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);
    res.status(200).json({
        status:"Success",
        message:"Created"
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Can not create brand",
    });
  }
};
