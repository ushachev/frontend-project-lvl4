import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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
  const containerRef = useRef();
  const dispatch = useDispatch();
  const {
    connected, sendMessage, sendChannel, sendChangedChannel, sendRemovedChannel,
  } = useChat();

  useEffect(() => {
    dispatch(fetchChatData());
  }, []);

  useEffect(() => {
    if (modal.type) {
      containerRef.current.setAttribute('aria-hidden', true);
    } else {
      containerRef.current.removeAttribute('aria-hidden');
    }
  }, [modal.type]);

  const { username } = JSON.parse(localStorage.getItem('user'));

  return (
    <div ref={containerRef}>
      <Container fluid className="h-100">
        <Row className="h-100">
          <Col xs={3} className="d-flex flex-column mh-100 px-0 pb-4 text-muted">
            <SidebarHeader username={username} />
            <h1 className="mt-3 mb-4 ps-3 fs-4 text-body text-opacity-75">
              <Link to="/">Hexlet Chat</Link>
            </h1>
            <ChannelList />
          </Col>
          <Col xs={9} className="d-flex flex-column mh-100 p-0 text-body text-opacity-75 bg-dark">
            <ChannelHeader />
            <MessageBox />
            <div className="px-5 py-1">
              <MessageInput
                sendMessage={sendMessage}
                connected={connected}
                username={username}
              />
            </div>
          </Col>
        </Row>
        {modal.type && (
          <ChatModal
            modal={modal}
            sendChannel={sendChannel}
            sendChangedChannel={sendChangedChannel}
            sendRemovedChannel={sendRemovedChannel}
          />
        )}
      </Container>
    </div>
  );
};

export default Root;
