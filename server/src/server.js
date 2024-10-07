const { createServer } = require('http');
const app = require('./app');
const upgrade = require('./ws/upgrade');
require('dotenv').config();

const { PORT } = process.env;
const server = createServer(app);

server.on('upgrade', upgrade);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
