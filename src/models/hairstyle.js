"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hairstyle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static async editHairstyle(id, name, html, markdown, image){
      try {
        const [results] = await sequelize.query(`UPDATE "Hairstyle" 
        SET name = '${name}', "descriptionHTML" = '${html}', "descriptionMarkdown" = '${markdown}', image = '${image}' 
        WHERE id = ${id} `);
        return results;
      } catch (error) {
        throw error;
      }
    }
  }
  Hairstyle.init(
    {
      name: DataTypes.STRING,
      descriptionHTML: DataTypes.TEXT,
      descriptionMarkdown: DataTypes.TEXT,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Hairstyle",
    }
  );
  return Hairstyle;
};
