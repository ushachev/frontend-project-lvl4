import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';

import useAuth from '../hooks/useAuth.js';
import fetchChatData from '../store/actions/index.js';

import ChannelList from '../components/ChannelList.jsx';

const Root = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChatData());
  }, []);

  return (
    <Container fluid className="h-100">
      <button type="button" onClick={auth.logOut}>Log out</button>
      <ChannelList />
    </Container>
  );
};

export default Root;
