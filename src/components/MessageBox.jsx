import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SimpleBar from 'simplebar-react';

import { selectCurrentMessageList } from '../store/reducers/messagesSlice.js';

const MessageBox = () => {
  const scrollableNodeRef = useRef();
  const messageList = useSelector(selectCurrentMessageList);

  useEffect(() => {
    scrollableNodeRef.current.scrollTop += (scrollableNodeRef.current.scrollHeight
      - scrollableNodeRef.current.clientHeight);
  }, [messageList]);

  return (
    <div className="mt-auto overflow-hidden">
      <SimpleBar scrollableNodeProps={{ ref: scrollableNodeRef }} className="mh-100">
        <ul className="list-unstyled">
          {messageList.map(({ id, username, body }) => (
            <li key={id} className="message py-1 ps-5 pe-4 text-break">
              <span className="me-2 fw-bold text-body">{`${username}:`}</span>
              <span>{body}</span>
            </li>
          ))}
        </ul>
      </SimpleBar>
    </div>
  );
};

export default MessageBox;
