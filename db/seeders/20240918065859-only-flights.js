'use strict';

const { fakerRU: faker } = require('@faker-js/faker');
const { Flight, Comment } = require('../models');
const rand = (max) => Math.floor(Math.random() * max) + 1;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const flights = new Array(20).fill(null).map(() => ({
      passengerId: rand(10),
      planeId: rand(5),
    }));
    console.log({ flights });
    await Flight.bulkCreate(flights).catch(console.log);

    await Comment.bulkCreate(
      new Array(40).fill(null).map(() => ({
        passengerId: rand(10),
        planeId: rand(5),
        text: faker.lorem.sentence(),
      })),
    ).catch(console.log);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Flights', null, {});
  },
};
