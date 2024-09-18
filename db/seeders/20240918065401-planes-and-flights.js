'use strict';

const { Passenger, Plane, Flight } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Passenger.bulkCreate([
      { name: 'John Doe', country: 'USA' },
      { name: 'Jane Doe', country: 'UK' },
      { name: 'John Smith', country: 'Canada' },
      { name: 'Jane Smith', country: 'Australia' },
      { name: 'John Brown', country: 'USA' },
      { name: 'Сергей Кошелев', country: 'Russia' },
      { name: 'Иван Иванов', country: 'Russia' },
      { name: 'Петр Петров', country: 'Russia' },
      { name: 'Мария Смирнова', country: 'Russia' },
      { name: 'Алексей Алексеев', country: 'Russia' },
    ]);

    await Plane.bulkCreate([
      { model: 'Boeing 747', capacity: 400 },
      { model: 'Airbus A320', capacity: 180 },
      { model: 'Boeing 777', capacity: 300 },
      { model: 'Airbus A350', capacity: 250 },
      { model: 'Boeing 787', capacity: 200 },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Passengers', null, {});
    await queryInterface.bulkDelete('Planes', null, {});
  },
};
