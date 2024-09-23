import hairstyleService from "../services/hairstyleService";
let createHairstyle = async (req, res) => {
  try {
    let infor = await hairstyleService.createHairstyle(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "error from server...",
    });
  }
};
let editHairstyle = async (req, res) => {
  try {
    let infor = await hairstyleService.editHairstyle(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "error from server...",
    });
  }
};
let getAllHairstyle = async (req, res) => {
  try {
    let infor = await hairstyleService.getAllHairstyle();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "error from server...",
    });
  }
};
let getDetailHairstyleById = async (req, res) => {
  try {
    let infor = await hairstyleService.getDetailHairstyleById(req.query.id,req.query.location);
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
  createHairstyle: createHairstyle,
  getAllHairstyle: getAllHairstyle,
  getDetailHairstyleById: getDetailHairstyleById,
  editHairstyle: editHairstyle,
};
