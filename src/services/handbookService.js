import db from "../models/index";
let getAllHandbook = () => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(db.Handbook);
        let data = await db.Handbook.customFindAll();
        if (data && data.length > 0) {
          data.map((item) => {
            console.log('Đây là handbook', item);
            return item;
          });
        }
        resolve({
          errCode: 0,
          errMessage: "get handbook success",
          data: data,
        });
      } catch (e) {
        reject(e);
      }
    });
  };

  module.exports = {
    getAllHandbook: getAllHandbook
  };