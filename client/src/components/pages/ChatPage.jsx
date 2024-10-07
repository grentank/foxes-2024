/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useRef, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
// import useChat from "../../hooks/useChat";
import ChatComponent from './chat/ui/ChatComponent';
import UsersList from './chat/ui/UsersList';
import ChatContext from '../../contexts/ChatContext';

export default function ChatPage() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isWsOnline, setIsWsOnline] = useState(false);

  const socketRef = useRef(null);

  useEffect(() => {
    function createSocket() {
      const socket = new WebSocket('http://localhost:3000');
      socket.onerror = (e) => console.log('Ошибка WS', e);
      socket.onopen = (e) => {
        console.log('WS соединение установлено', e);
        setIsWsOnline(true);
      };
      socket.onclose = (e) => {
        setIsWsOnline(false);
        console.log('WS соединение закрыто', e);
        setTimeout(createSocket, 3000);
      };
      socket.onmessage = (e) => {
        const action = JSON.parse(e.data);
        const { type, payload } = action;
        switch (type) {
          case 'SET_USERS':
            setOnlineUsers(payload);
            break;
          case 'ADD_MESSAGE':
            setMessages((prev) => [...prev, payload]);
            break;
          case 'SET_MESSAGES':
            setMessages(payload);
            break;
          default:
            break;
        }
      };

      socketRef.current = socket;
    }

    createSocket();
  }, []);

  const sendMessageHandler = (text) => {
    const action = {
      type: 'POST_NEW_MESSAGE',
      payload: text,
    };
    socketRef.current.send(JSON.stringify(action));
  };

  return (
    <ChatContext.Provider
      value={{
        socketRef,
        onlineUsers,
        messages,
        sendMessageHandler,
      }}
    >
      <Container>
        <Row className="justify-content-center align-items-center text-center">
          <Col xs={6}>
            <h1 style={{ color: isWsOnline ? 'green' : 'red' }} className="p-2 display-3">
              Chat
            </h1>
          </Col>
        </Row>
        <Card className="p-4">
          <Row>
            <Col xs={2}>
              <UsersList />
            </Col>
            <Col xs={10}>
              <ChatComponent />
              {/* {typing && loggedUser.id !== typing.id ? `${typing.username} is typing...` : ''} */}
            </Col>
          </Row>
        </Card>
      </Container>
    </ChatContext.Provider>
  );
}
