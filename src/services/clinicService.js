import db from "../models/index";

let createClinic = async (data) => {
  return new Promise(async(resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.descriptionMarkdown ||
        !data.descriptionHTML ||
        !data.imageBase64
      ) {
          resolve({
              errCode: 1,
              errMessage:"Missing many fields"
        });
      } else {
         await db.Clinic.create({
          name: data.name,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
          address:data.address
        });
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

let getAllClinic = async () => {
  return new Promise(async(resolve, reject) => {
       try {
         let data = await db.Clinic.findAll();
         if (data && data.length > 0) {
           data.map((item) => {
             item.image = new Buffer(item.image, "base64").toString("binary");
             return item;
           });
         }
         resolve({
           errCode: 0,
           errMessage: "get clinic success",
           data: data,
         });
       } catch (e) {
         reject(e);
       }
     })
}
let getDetailClinicById = async (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      //
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing request parameter id",
        });
      } else {
        let data = {};
        data = await db.Clinic.findOne({
          where: { id: inputId },
          attributes: ["descriptionHTML", "descriptionMarkdown","name","address"],
        });
        if (data) {
          let doctorClinic = []; 
            doctorClinic = await db.Doctor_Infor.findAll({
              where: { clinicId: inputId },
              attributes: ["doctorId", "provinceId"],
            });    
          data.doctorClinic = doctorClinic;
        } else {
          data = {};
        }
        resolve({
          errCode: 0,
          errMessage: "ok",
          data: data,
        });
      }
      //
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
};
