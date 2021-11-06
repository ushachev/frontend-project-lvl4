import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import useChat from '../hooks/useChat.js';

import fetchChatData from '../store/actions/index.js';

import { selectCurrentChannelId } from '../store/reducers/currentChannelSlice.js';

import SidebarHeader from '../components/SidebarHeader.jsx';
import ChannelList from '../components/ChannelList.jsx';
import ChannelHeader from '../components/ChannelHeader.jsx';
import MessageBox from '../components/MessageBox.jsx';
import MessageInput from '../components/MessageInput.jsx';

const Root = () => {
  const currentChannelId = useSelector(selectCurrentChannelId);
  const dispatch = useDispatch();
  const { connected, sendMessage } = useChat();

  useEffect(() => {
    dispatch(fetchChatData());
  }, []);

  const { username } = JSON.parse(localStorage.getItem('user'));

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col xs={3} className="p-0 text-muted">
          <SidebarHeader username={username} />
          <h1 className="mt-3 mb-4 ps-3 fs-4 text-body text-opacity-75">Hexlet Chat</h1>
          <ChannelList currentChannelId={currentChannelId} />
        </Col>
        <Col xs={9} className="d-flex flex-column mh-100 overflow-hidden p-0 text-body text-opacity-75">
          <ChannelHeader />
          <MessageBox />
          <div className="px-5 pb-2 bg-dark">
            <MessageInput
              sendMessage={sendMessage}
              connected={connected}
              username={username}
              currentChannelId={currentChannelId}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Root;
