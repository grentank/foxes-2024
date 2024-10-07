import React from 'react';
import { Stack } from 'react-bootstrap';
import MessageForm from './MessageForm';
import MessagesList from './MessagesList';

export default function ChatComponent() {
  return (
    <Stack>
      <MessagesList />
      <MessageForm />
    </Stack>
  );
}
