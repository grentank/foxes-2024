'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plane extends Model {
    static associate({ Flight, Passenger, Comment }) {
      this.hasMany(Flight, { foreignKey: 'planeId' });
      this.belongsToMany(Passenger, {
        through: Flight,
        foreignKey: 'planeId',
        as: 'passengers',
      });
      this.belongsToMany(Passenger, {
        through: Comment,
        foreignKey: 'planeId',
        as: 'commentedBy',
      });
    }
  }
  Plane.init(
    {
      model: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Plane',
    },
  );
  return Plane;
};
