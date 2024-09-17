'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate({ Group, Post }) {
      this.belongsTo(Group, { foreignKey: 'groupId' });
      this.hasMany(Post, { foreignKey: 'studentId' });
    }
  }
  Student.init(
    {
      name: DataTypes.STRING,
      git: DataTypes.STRING,
      groupId: DataTypes.INTEGER, // Если есть внешний ключ, то belongsTo
    },
    {
      sequelize,
      modelName: 'Student',
    },
  );
  return Student;
};
