import React, { useEffect, useContext, useRef } from 'react';
import { Card } from 'react-bootstrap';
import UserContext from '../../../../contexts/UserContext';

export default function ChatMessage({ message }) {
  const { user } = useContext(UserContext);
  const justifyContent =
    user.id === message.User?.id ? 'justify-content-end' : 'justify-content-start';

  const ref = useRef(); // { current: undefined }
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  return (
    <div className={`d-flex ${justifyContent} mt-2 mb-2`}>
      <Card style={{ width: '15rem' }}>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">{message.User?.username}</Card.Subtitle>
          <Card.Text ref={ref}>{message.text}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
