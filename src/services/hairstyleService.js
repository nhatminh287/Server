import db from "../models/index";
let createHairstyle = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "missing parameter",
        });
      } else {
        await db.Hairstyle.create({
          name: data.name,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
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
let editHairstyle = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "missing parameter",
        });
      } else {
        await db.Hairstyle.editHairstyle(data.id, data.name, data.descriptionHTML, data.descriptionMarkdown, data.imageBase64);
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
let getAllHairstyle = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Hairstyle.findAll();
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        errMessage: "get hairstyle success",
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailHairstyleById = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          errMessage: "Missing request parameter id",
        });
      } else {
        let data = {};
        data = await db.Hairstyle.findOne({
          where: { id: inputId },
          attributes: ["descriptionHTML", "descriptionMarkdown"],
        });
        console.log("data hairstyle.findone: ", data);
        if (data) {
          let barberHairstyle=[];
          console.log("location: ", location);
          if (location === 'ALL') {

             barberHairstyle = await db.Barber_Infor.findAll({
               where: { hairstyleId: inputId },
               attributes: ["barberId", "provinceId"],
             });
             console.log("barberHairstyle: ", barberHairstyle);
          } else {
             barberHairstyle = await db.Barber_Infor.findAll({
               where: {
                 hairstyleId: inputId,
                 provinceId: location
               },
               attributes: ["barberId", "provinceId"],
             });
          }
          data.barberHairstyle = barberHairstyle;
        } else {
          data = {};
        }
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

module.exports = {
  createHairstyle: createHairstyle,
  getAllHairstyle: getAllHairstyle,
  getDetailHairstyleById: getDetailHairstyleById,
  editHairstyle: editHairstyle,
};
