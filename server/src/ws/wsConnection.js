const { Message, User } = require('../../db/models');

const activeConnections = new Map();

async function wsConnection(ws, request, user) {
  ws.on('error', console.error);

  // INIT
  activeConnections.set(user.id, { ws, user });

  activeConnections.forEach(async (connection) => {
    const action = {
      type: 'SET_USERS',
      payload: [...activeConnections.values()].map(({ user: u }) => u),
    };
    connection.ws.send(JSON.stringify(action));
  });
  const allMessages = await Message.findAll({ include: User });
  const setMessgesAction = {
    type: 'SET_MESSAGES',
    payload: allMessages,
  };
  ws.send(JSON.stringify(setMessgesAction));

  // INIT END

  ws.on('close', () => {
    activeConnections.delete(user.id);
    activeConnections.forEach((connection) => {
      const action = {
        type: 'SET_USERS',
        payload: [...activeConnections.values()].map(({ user: u }) => u),
      };
      connection.ws.send(JSON.stringify(action));
    });
  });

  ws.on('message', async (data) => {
    const action = JSON.parse(data);
    const { type, payload } = action;
    switch (type) {
      case 'POST_NEW_MESSAGE': {
        const newMessage = await Message.create({ text: payload, authorId: user.id });
        const newMessageWithAuthor = await Message.findOne({
          where: { id: newMessage.id },
          include: User,
        });
        const addMessageAcion = {
          type: 'ADD_MESSAGE',
          payload: newMessageWithAuthor.get(),
        };
        activeConnections.forEach((connection) =>
          connection.ws.send(JSON.stringify(addMessageAcion)),
        );
      }

      default:
        break;
    }
  });
}

module.exports = wsConnection;
