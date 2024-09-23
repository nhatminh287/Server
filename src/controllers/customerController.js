import db from "../models/index";
import customerService from "../services/customerService";

let postBookAppointment = async(req, res) => {
     try {
       let infor = await customerService.postBookAppointment(req.body);
       return res.status(200).json(infor);
     } catch (e) {
       console.log(e);
       return res.status(200).json({
         errCode: -1,
         errMessage: "error from server...",
       });
     }
}
let postVerifyBookAppointment = async (req, res) => {
  try {
    let infor = await customerService.postVerifyBookAppointment(req.body);
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
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
};
