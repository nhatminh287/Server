import barberService from "../services/barberService";

let getTopBarberHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await barberService.getTopBarberHome(+limit); // use +limit because maybe limit is string and must convert limit to number
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "error from server...",
    });
  }
};

let getAllBarbers = async (req, res) => {
  try {
    let barbers = await barberService.getAllBarbers();
    return res.status(200).json(barbers);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "error from server...",
    });
  }
};

let postInforBarber = async (req, res) => {
  try {
    let response = await barberService.saveDetailInforBarber(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "error from server...",
    });
  }
};

let getDetailBarberById = async (req, res) => {
  try {
    let infor = await barberService.getDetailBarberById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "error from server...",
    });
  }
};
let bulkCreateSchedule = async (req, res) => {
  try {
    let infor = await barberService.bulkCreateSchedule(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "error from server...",
    });
  }
};

let getScheduleByDate = async (req, res) => {
  try {
    let infor = await barberService.getScheduleByDate(
      req.query.barberId,
      req.query.date
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "error from server...",
    });
  }
};

let getExtraInforBarberById = async (req, res) => {
  try {
    let infor = await barberService.getExtraInforBarberById(req.query.barberId);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "error from server...",
    });
  }
};
let getProfileBarberById = async (req, res) => {
  try {
    let infor = await barberService.getProfileBarberById(req.query.barberId);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "error from server...",
    });
  }
};
let getListCustomerForBarber = async (req, res) => {
  try {
    let infor = await barberService.getListCustomerForBarber(
      req.query.barberId,
      req.query.date
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "error from server...",
    });
  }
};
let sendRemedy = async (req, res) => {
  try {
    let infor = await barberService.sendRemedy(req.body);
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
  getTopBarberHome: getTopBarberHome,
  getAllBarbers: getAllBarbers,
  postInforBarber: postInforBarber,
  getDetailBarberById: getDetailBarberById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInforBarberById: getExtraInforBarberById,
  getProfileBarberById: getProfileBarberById,
  getListCustomerForBarber: getListCustomerForBarber,
  sendRemedy: sendRemedy,
};
