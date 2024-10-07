import React, { useContext } from 'react';
import { Stack } from 'react-bootstrap';
import ChatMessage from './ChatMessage';
import ChatContext from '../../../../contexts/ChatContext';

export default function MessagesList() {
  const { messages } = useContext(ChatContext);
  return (
    <div className="overflow-auto" style={{ height: '23rem' }}>
      <Stack>
        {messages.map((message) => (
          <ChatMessage message={message} key={message.id} />
        ))}
      </Stack>
    </div>
  );
}
