import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import fetchChatData from '../store/actions/index.js';

import SidebarHeader from '../components/SidebarHeader.jsx';
import ChannelList from '../components/ChannelList.jsx';
import ChannelHeader from '../components/ChannelHeader.jsx';
import MessageBox from '../components/MessageBox.jsx';
import MessageInput from '../components/MessageInput.jsx';

const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChatData());
  }, []);

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col xs={3} className="p-0 text-muted">
          <SidebarHeader />
          <h1 className="mt-3 mb-4 ps-3 fs-4 text-body text-opacity-75">Hexlet Chat</h1>
          <ChannelList />
        </Col>
        <Col xs={9} className="d-flex flex-column p-0 text-body text-opacity-75">
          <ChannelHeader />
          <MessageBox />
          <div className="px-5 pb-4 bg-dark">
            <MessageInput />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Root;
