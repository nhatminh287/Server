"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Barber_Barbershop_Hairstyle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Barber_Barbershop_Hairstyle.init(
    {
      barberId: DataTypes.INTEGER,
      barbershopId: DataTypes.INTEGER,
      hairstyleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Barber_Barbershop_Hairstyle",
    }
  );
  return Barber_Barbershop_Hairstyle;
};
