const sequelize = require('./connection');

async function migrate() {
  try {
    const [results] = await sequelize.query(
      ` 
    DROP TABLE IF EXISTS phones;
    DROP TABLE IF EXISTS users;

    CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(32) NOT NULL,
          "secondName" VARCHAR(255),
          age SMALLINT
          );
          
    CREATE TABLE IF NOT EXISTS phones (
          id SERIAL PRIMARY KEY,
          phone VARCHAR(32) NOT NULL,
          "userId" INTEGER REFERENCES users(id)
          );
          `,
    );
    console.log('results', results);
  } catch (error) {
    console.log(error);
  }
}

migrate();
