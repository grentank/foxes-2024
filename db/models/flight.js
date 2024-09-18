'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    static associate({ Plane, Passenger }) {
      this.belongsTo(Plane, { foreignKey: 'planeId' });
      this.belongsTo(Passenger, { foreignKey: 'passengerId' });
    }
  }
  Flight.init(
    {
      passengerId: DataTypes.INTEGER,
      planeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Flight',
    },
  );
  return Flight;
};
