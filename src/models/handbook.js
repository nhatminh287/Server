"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Handbook extends Model {
    static associate(models) {
      // Define associations here
    }

    static async customFindAll() {
      try {
        const [results] = await sequelize.query(`SELECT * FROM "Handbook"`);
        return results;
      } catch (error) {
        throw error;
      }
    }
  }

  Handbook.init(
    {
      ID: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      link: DataTypes.TEXT,
      image: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: "Handbook",
    }
  );

  return Handbook;
};
