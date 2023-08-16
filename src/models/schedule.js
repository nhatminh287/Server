"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.belongsTo(models.Allcode, { foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypeData' })
      Schedule.belongsTo(models.User,{foreignKey:'doctorId',targetKey: 'id',as:'doctorData'})
    }
    static async customFindAll(id, date) {
      try {
        const [results] = await sequelize.query(`SELECT "timeType", "date", "doctorId", "maxNumber" FROM "Schedules" AS "Schedule" WHERE "Schedule"."doctorId" = ${id} AND "Schedule"."date" = '${date}'`);
        return results;
      } catch (error) {
        throw error;
      }
    }
  }
  Schedule.init(
    {
      currentNumber: DataTypes.INTEGER,
      maxNumber: DataTypes.INTEGER,
      date: DataTypes.STRING,
      timeType: DataTypes.STRING,
      doctorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Schedule",
    }
  );
  return Schedule;
};
