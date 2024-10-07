const { hashSync } = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        { username: 'Alex', email: '1@1', password: hashSync('1', 10) },
        { username: 'Bob', email: '2@2', password: hashSync('2', 10) },
        { username: 'Carl', email: '3@3', password: hashSync('3', 10) },
        { username: 'Dave', email: '4@4', password: hashSync('4', 10) },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
