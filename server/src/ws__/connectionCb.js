const { Message, User } = require('../../db/models');

const map = new Map();

const connectionCb = (socket, request, userFromJWT) => {
  map.set(userFromJWT.id, { ws: socket, user: userFromJWT });

  socket.on('error', console.log);

  map.forEach(({ ws }) =>
    ws.send(
      JSON.stringify({
        type: 'SET_USERS_FROM_SERVER',
        payload: [...map.values()].map(({ user }) => user),
      }),
    ),
  );

  socket.on('message', async (data) => {
    const { type, payload } = JSON.parse(data);

    switch (type) {
      case 'ADD_MESSAGE_FROM_CLIENT':
        {
          const newMessage = await Message.create({
            text: payload,
            authorId: userFromJWT.id,
          });
          const messageWithAuthor = await Message.findByPk(newMessage.id, {
            include: User,
          });

          map.forEach(({ ws }) =>
            ws.send(
              JSON.stringify({
                type: 'ADD_MESSAGE_FROM_SERVER',
                payload: messageWithAuthor,
              }),
            ),
          );
        }
        break;

      case 'SET_TYPING_FROM_CLIENT':
        map.forEach(({ ws }) =>
          ws.send(
            JSON.stringify({
              type: 'SET_TYPING_FROM_SERVER',
              payload: userFromJWT,
            }),
          ),
        );

        break;

      case 'STOP_TYPING_FROM_CLIENT':
        map.forEach(({ ws }) =>
          ws.send(
            JSON.stringify({
              type: 'STOP_TYPING_FROM_SERVER',
            }),
          ),
        );

        break;

      default:
        break;
    }
  });

  socket.on('close', () => {
    map.delete(userFromJWT.id);
    map.forEach(({ ws }) =>
      ws.send(
        JSON.stringify({
          type: 'SET_USERS_FROM_SERVER',
          payload: [...map.values()].map(({ user }) => user),
        }),
      ),
    );
  });
};

module.exports = connectionCb;
