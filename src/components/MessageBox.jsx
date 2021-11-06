import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentMessageList } from '../store/reducers/messagesSlice.js';

const MessageBox = () => {
  const messageList = useSelector(selectCurrentMessageList);

  return (
    <div className="flex-grow-1 bg-dark">
      <ul>
        {messageList.map(({ id, username, body }) => (
          <li key={id}>
            <span className="me-2 fw-bold">{`${username}:`}</span>
            <span>{body}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageBox;
