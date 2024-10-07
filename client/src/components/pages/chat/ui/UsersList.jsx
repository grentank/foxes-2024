import React, { useContext } from 'react';
import { Stack } from 'react-bootstrap';
import DotOnlineIcon from '../../../ui/icons/DotOnlineIcon';
import ChatContext from '../../../../contexts/ChatContext';

export default function UsersList() {
  const { onlineUsers } = useContext(ChatContext);
  return (
    <Stack>
      <h6>Users online</h6>
      {onlineUsers.map((user) => (
        <div className="p-2" key={user.id}>
          <DotOnlineIcon />
          {user.username}
        </div>
      ))}
    </Stack>
  );
}
