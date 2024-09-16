const sequelize = require('./connection');

async function seed() {
  try {
    const [results] = await sequelize.query(
      `INSERT INTO users (name, "secondName", age) VALUES
    ('Боб', 'Бобовски', 40),
    ('Алекс', 'Алексовски', 30),
    ('Иван', 'Ивановски', 20),
    ('Петр', 'Петровски', 50),
    ('Сидор', 'Сидоровски', 60);

    INSERT INTO phones (phone, "userId") VALUES
    ('84956657772', 1),
    ('89256238984', 2),
    ('+7-903-121-90-90', 3),
    ('7-925-1219091', 4),
    ('656-7742', 5),
    ('+7-903-121-4545', 1),
    ('+7-903-121-6778', 1),
    ('+79031213221', 1),
    ('89271219061', 3),
    ('89141519055', 2);
      `,
    );
    console.log('results', results);
  } catch (error) {
    console.log(error);
  }
}

seed();
