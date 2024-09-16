const { Sequelize } = require('sequelize');

// Создать своего пользователя
// admin - 123
// Создайте базу данных admin (по названию совпадает с именем пользователя)
// database - postgres
// username - postgres
// password - postgres ????
const sequelize = new Sequelize('phonebook', 'admin', '123', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;

async function test() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// test();
