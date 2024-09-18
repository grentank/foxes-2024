'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      passengerId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Passengers',
          },
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      planeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Planes',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Flights');
  },
};
