const sequelize = require('./db/connection');

(async () => {
  try {
    // const [results, metadata] = await sequelize.query(
    //   "CREATE ROLE admin WITH LOGIN SUPERUSER PASSWORD '123';",
    // );
    // const [results, metadata] = await sequelize.query(
    //   'CREATE DATABASE phonebook OWNER admin;',
    // );
    // await sequelize.query(
    //   `INSERT INTO users (name, "secondName", age) VALUES ('abcdabcdabcdabcdabcdabcdabcdabcd1', 'abc', 30);`,
    // );
    // await sequelize.query('DELETE FROM users WHERE id=2;');
    // const [results] = await sequelize.query('SELECT * FROM users;');
    // // console.log('results', results);
    // console.log(
    //   `Средний возраст: ${
    //     results.reduce((acc, user) => acc + user.age, 0) / results.length
    //   }`,
    //   results,
    // const [results] = await sequelize.query('SELECT * FROM phones JOIN users ON phones."userId" = users.id;');
    const [results] = await sequelize.query(
      'SELECT * FROM users JOIN phones ON phones."userId" = users.id;',
    );
    console.log(results);
  } catch (error) {
    console.log(error);
  }
})();
