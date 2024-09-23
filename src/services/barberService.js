import db from "../models/index";
require("dotenv").config();
import _ from "lodash";
import emailService from "./emailService";
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopBarberHome = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limitInput,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllBarbers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let barbers = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });
      resolve({
        errCode: 0,
        data: barbers,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//function check parameter
let checkRequiredFields = (inputData) => {
  let arrFields = [
    "barberId",
    "contentHTML",
    "contentMarkdown",
    "action",
    "selectedPrice",
    "selectedProvince",
    "selectedPayment",
    "nameBarbershop",
    "addressBarbershop",
    "hairstyleId",
  ];
  let elementErr = "";
  let isValid = true;
  for (let i = 0; i < arrFields.length; i++) {
    if (!inputData[arrFields[i]]) {
      isValid = false;
      elementErr = arrFields[i];
      break;
    }
  }
  return {
    isValid: isValid,
    elementErr: elementErr,
  };
};

let saveDetailInforBarber = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkObj = checkRequiredFields(inputData);
      if (checkObj.isValid === false) {
        resolve({
          errCode: 1,
          errMessage: `missing require parameter : ${checkObj.elementErr}`,
        });
      } else {
        //up sert to markdown
        if (inputData.action === "CREATE") {
          await db.Markdown.create({
            contentHTML: inputData.contentHTML,
            contentMarkdown: inputData.contentMarkdown,
            description: inputData.description,
            barberId: inputData.barberId,
          });
        }
        if (inputData.action === "EDIT") {
          let barberMarkdown = await db.Markdown.findOne({
            where: { barberId: inputData.barberId },
            raw: false,
          });
          if (barberMarkdown) {
            barberMarkdown.contentHTML = inputData.contentHTML;
            barberMarkdown.contentMarkdown = inputData.contentMarkdown;
            barberMarkdown.description = inputData.description;
            barberMarkdown.updatedAt = new Date();
            await barberMarkdown.save();
          }
        }
        //up sert to barber_infor table
        let barberInfor = await db.Barber_Infor.findOne({
          where: {
            barberId: inputData.barberId,
          },
          raw: false,
        });
        if (barberInfor) {
          //update
          (barberInfor.barberId = inputData.barberId),
            (barberInfor.priceId = inputData.selectedPrice);
          barberInfor.provinceId = inputData.selectedProvince;
          barberInfor.paymentId = inputData.selectedPayment;

          barberInfor.nameBarbershop = inputData.nameBarbershop;
          barberInfor.addressBarbershop = inputData.addressBarbershop;
          barberInfor.note = inputData.note;
          barberInfor.hairstyleId = inputData.hairstyleId;
          barberInfor.barbershopId = inputData.barbershopId;
          await barberInfor.save();
          resolve({
            errCode: 0,
            errMessage: "update success",
          });
        } else {
          // create
          await db.Barber_Infor.create({
            barberId: inputData.barberId,
            priceId: inputData.selectedPrice,
            provinceId: inputData.selectedProvince,
            paymentId: inputData.selectedPayment,

            nameBarbershop: inputData.nameBarbershop,
            addressBarbershop: inputData.addressBarbershop,
            note: inputData.note,
            hairstyleId: inputData.hairstyleId,
            barbershopId: inputData.barbershopId,
          });
          resolve({
            errCode: 0,
            errMessage: "create success",
          });
        }
      }
    } catch (e) {
      console.log("error from server .......");
    }
  });
};

let getDetailBarberById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing request parameter",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: inputId },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Barber_Infor,
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
        
        if (data && data.image) {
          if (data.image.startsWith("http://") || data.image.startsWith("https://")) {
            // Nếu data.image là đường dẫn HTTP, không cần xử lý mã hóa
          } else {
            // Nếu data.image là chuỗi base64, thực hiện việc giải mã
            const imageBuffer = Buffer.from(data.image, "base64");
            data.image = imageBuffer.toString("binary");
          }
        }
        
        if (!data) {
          data = {};
        }
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let bulkCreateSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule || !data.barberId || !data.formattedDate) {
        resolve({
          errCode: 1,
          errMessage: "Missing require parameter",
        });
      } else {
        let schedule = data.arrSchedule;
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = MAX_NUMBER_SCHEDULE;
            return item;
          });
        }
        console.log("data bulk schedule: ", data);
        //get all existing data
        /* let existing = await db.Schedule.findAll(data.barberId,data.formattedDate);
        console.log('existing data: ', existing); */

        let existing = await db.Schedule.findAll({
          where: { barberId: data.barberId, date: data.formattedDate },
          attributes: ["timeType", "date", "barberId", "maxNumber"],
          raw: true,
        });
        
        //compare different
        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return a.timeType === b.timeType && +a.date === +b.date;
        });
        console.log("bulk create: ", toCreate);
        //create data
        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }
        //await db.Schedule.bulkCreate(data.arrSchedule);
        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getScheduleByDate = (barberId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!barberId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let data = await db.Schedule.findAll({
          where: { barberId: barberId, date: date.toString() },
          include: [
            {
              model: db.Allcode,
              as: "timeTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.User,
              as: "barberData",
              attributes: ["firstName", "lastName"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (!data) {
          data = [];
        }
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getExtraInforBarberById = (idInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idInput) {
        resolve({
          errCode: 1,
          errMessage: "missing required params",
        });
      } else {
        let data = await db.Barber_Infor.findOne({
          where: { barberId: idInput },
          attributes: {
            exclude: ["id", "barberId"],
          },
          include: [
            {
              model: db.Allcode,
              as: "priceTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "provinceTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "paymentTypeData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (!data) {
          data = {};
        }
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getProfileBarberById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing Request parameter",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: inputId },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Barber_Infor,
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
        
        if (data && data.image) {
          if (data.image.startsWith("http://") || data.image.startsWith("https://")) {
            // Nếu data.image là đường dẫn HTTP, không cần xử lý mã hóa
          } else {
            // Nếu data.image là chuỗi base64, thực hiện việc giải mã
            const imageBuffer = Buffer.from(data.image, "base64");
            data.image = imageBuffer.toString("binary");
          }
        }
        if (!data) {
          data = {};
        }
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getListCustomerForBarber = (barberId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!barberId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let data = await db.BooKing.findAll({
          where: {
            statusId: "S2",
            barberId: barberId,
            date: date,
          },
          include: [
            {
              model: db.User,
              as: "customerData",
              attributes: ["email", "firstName", "address", "gender"],
              include: [
                {
                  model: db.Allcode,
                  as: "genderData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
            {
              model: db.Allcode,
              as: "timeTypeDataCustomer",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });
        resolve({
          errCode: 0,
          errMessage: "ok",
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let sendRemedy = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.barberId || !data.customerId || !data.timeType) {
        resolve({
          errCode: 1,
          errMessage: "missing required parameter",
        });
      } else {
        // update customer status
        let appointment = await db.BooKing.findOne({
          where: {
            barberId: data.barberId,
            customerId: data.customerId,
            timeType: data.timeType,
            statusId: "S2",
          },
          raw: false,
        });
        if (appointment) {
          appointment.statusId = "S3";
          await appointment.save();
        }
        // send mail for customer
          await emailService.sendAttachment(data);

        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getTopBarberHome: getTopBarberHome,
  getAllBarbers: getAllBarbers,
  saveDetailInforBarber: saveDetailInforBarber,
  getDetailBarberById: getDetailBarberById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInforBarberById: getExtraInforBarberById,
  getProfileBarberById: getProfileBarberById,
  getListCustomerForBarber: getListCustomerForBarber,
  sendRemedy: sendRemedy,
};
