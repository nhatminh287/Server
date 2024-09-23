import db from "../models/index";

let createBarbershop = async (data) => {
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
         await db.Barbershop.create({
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

let getAllBarbershop = async () => {
  return new Promise(async(resolve, reject) => {
       try {
         let data = await db.Barbershop.findAll();
         if (data && data.length > 0) {
           data.map((item) => {
             item.image = new Buffer(item.image, "base64").toString("binary");
             return item;
           });
         }
         resolve({
           errCode: 0,
           errMessage: "get barbershop success",
           data: data,
         });
       } catch (e) {
         reject(e);
       }
     })
}
let getDetailBarbershopById = async (inputId) => {
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
        data = await db.Barbershop.findOne({
          where: { id: inputId },
          attributes: ["descriptionHTML", "descriptionMarkdown","name","address"],
        });
        if (data) {
          let barberBarbershop = []; 
            barberBarbershop = await db.Barber_Infor.findAll({
              where: { barbershopId: inputId },
              attributes: ["barberId", "provinceId"],
            });    
          data.barberBarbershop = barberBarbershop;
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
  createBarbershop: createBarbershop,
  getAllBarbershop: getAllBarbershop,
  getDetailBarbershopById: getDetailBarbershopById,
};
