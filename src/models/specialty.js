"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static async editSpecialty(id, name, html, markdown, image){
      try {
        const [results] = await sequelize.query(`UPDATE "Specialties" 
        SET name = '${name}', "descriptionHTML" = '${html}', "descriptionMarkdown" = '${markdown}', image = '${image}' 
        WHERE id = ${id} `);
        return results;
      } catch (error) {
        throw error;
      }
    }
  }
  Specialty.init(
    {
      name: DataTypes.STRING,
      descriptionHTML: DataTypes.TEXT,
      descriptionMarkdown: DataTypes.TEXT,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Specialty",
    }
  );
  return Specialty;
};
