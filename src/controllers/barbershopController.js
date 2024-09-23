import barbershopService from '../services/barbershopService';

let createBarbershop = async (req, res) => {
  try {
    let infor = await barbershopService.createBarbershop(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "error from server...",
    });
  }
};
let getAllBarbershop = async (req, res) => {
  try {
    let infor = await barbershopService.getAllBarbershop();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "error from server...",
    });
  }
};
let getDetailBarbershopById = async (req, res) => {
  try {
    let infor = await barbershopService.getDetailBarbershopById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "error from server...",
    });
  }
};

module.exports = {
  createBarbershop: createBarbershop,
  getAllBarbershop: getAllBarbershop,
  getDetailBarbershopById: getDetailBarbershopById,
};