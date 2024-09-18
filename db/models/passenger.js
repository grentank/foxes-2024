'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Passenger extends Model {
    static associate({ Flight, Plane, Comment }) {
      this.hasMany(Flight, { foreignKey: 'passengerId' });
      this.belongsToMany(Plane, { through: Flight, foreignKey: 'passengerId', as: 'planes' });
      this.belongsToMany(Plane, { through: Comment, foreignKey: 'passengerId', as: 'commentedOn' });
    }
  }
  Passenger.init(
    {
      name: DataTypes.STRING,
      country: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Passenger',
    },
  );
  return Passenger;
};
