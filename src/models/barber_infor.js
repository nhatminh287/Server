"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Barber_Infor extends Model {
    
    static associate(models) {
      // define association here
      Barber_Infor.belongsTo(models.User, { foreignKey: 'barberId' })

      Barber_Infor.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceTypeData' })
      Barber_Infor.belongsTo(models.Allcode, { foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceTypeData' })
      Barber_Infor.belongsTo(models.Allcode, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentTypeData' })
    }
  }
  Barber_Infor.init(
    {
      barberId: DataTypes.INTEGER,
      hairstyleId: DataTypes.INTEGER,
      barbershopId: DataTypes.INTEGER,
      priceId: DataTypes.STRING,
      provinceId: DataTypes.STRING,
      paymentId: DataTypes.STRING,
      addressBarbershop: DataTypes.STRING,
      nameBarbershop: DataTypes.STRING,
      note: DataTypes.STRING,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Barber_Infor",
      freezeTableName:true,
    }
  );
  return Barber_Infor;
};
