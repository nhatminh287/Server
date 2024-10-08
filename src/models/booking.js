"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BooKing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BooKing.belongsTo(models.User, { foreignKey: 'customerId', targetKey: 'id', as: 'customerData' })
      BooKing.belongsTo(models.Allcode,{foreignKey:'timeType',targetKey:'keyMap',as:'timeTypeDataCustomer'})
    }
    static async customFindOrCreate(user, data, token) {
      const query = `
        INSERT INTO "Bookings" ("statusId", "barberId", "customerId", "date", "timeType", "token")
        VALUES ('S1', ${data.barberId}, ${user[0].id}, '${data.date}', '${data.timeType}', '${token}')
        ON CONFLICT ("customerId") DO NOTHING
        RETURNING *;
      `;
    
      const [results] = await sequelize.query(query, { type: sequelize.QueryTypes.INSERT });
      return results;
    }
  }
  BooKing.init(
    {
      statusId: DataTypes.STRING,
      barberId: DataTypes.INTEGER,
      customerId: DataTypes.INTEGER,
      date: DataTypes.STRING,
      timeType: DataTypes.STRING,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BooKing",
    }
  );
  return BooKing;
};
