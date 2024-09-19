1. Проинициализировать проект
2. `.sequelizerc`: поменять расширение `database.json` -> `database.js`
3. Установить пакет `npm i dotenv`
4. В файле `.sequelizerc`:

```js
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  /* ... */
};
```

5. Создать файл `.env` и прописать там значения переменных

```
DB_USER=admin
DB_NAME=exam
DB_PASS=123
```

6. На основе файла `.env` создать `.env.example` только с ключами переменных (значения
   убрать)
