import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import useChat from '../hooks/useChat.js';

import fetchChatData from '../store/actions/index.js';

import { selectModal } from '../store/reducers/modalSlice.js';

import SidebarHeader from '../components/SidebarHeader.jsx';
import ChannelList from '../components/ChannelList.jsx';
import ChannelHeader from '../components/ChannelHeader.jsx';
import MessageBox from '../components/MessageBox.jsx';
import MessageInput from '../components/MessageInput.jsx';
import ChatModal from '../components/ChatModal.jsx';

const Root = function Root() {
  const modal = useSelector(selectModal);
  const dispatch = useDispatch();
  const { connectSocket, disconnectSocket } = useChat();

  useEffect(() => {
    dispatch(fetchChatData());
    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, []);

  const { username } = JSON.parse(localStorage.getItem('user'));

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col xs={3} className="d-flex flex-column mh-100 px-0 pb-4 text-muted">
          <SidebarHeader username={username} />
          <h1 className="mt-3 mb-4 ps-3 fs-4 text-body text-opacity-75">Hexlet Chat</h1>
          <ChannelList />
        </Col>
        <Col xs={9} className="d-flex flex-column mh-100 p-0 text-body text-opacity-75 bg-dark">
          <ChannelHeader />
          <MessageBox />
          <div className="px-5 py-1">
            <MessageInput
              username={username}
            />
          </div>
        </Col>
      </Row>
      {modal.type && (
        <ChatModal
          modal={modal}
        />
      )}
    </Container>
  );
};

export default Root;
