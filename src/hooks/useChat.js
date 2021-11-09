import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import { addMessage } from '../store/reducers/messagesSlice.js';
import { addChannel } from '../store/reducers/channelsSlice.js';

const useChat = () => {
  const [connected, setConnected] = useState(false);
  const dispatch = useDispatch();
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io();
    socketRef.current.on('connect', () => {
      console.log('Chat: socket connected with id', socketRef.current.id);
      setConnected(true);
    });
    socketRef.current.on('disconnect', () => {
      console.log('Chat: socket disconnected');
      setConnected(false);
    });
    socketRef.current.on('newMessage', (message) => {
      console.log('Chat: new message added');
      dispatch(addMessage(message));
    });
    socketRef.current.on('newChannel', (channel) => {
      console.log('Chat: new channel added');
      dispatch(addChannel(channel));
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const getPromiseByEvent = (event, payload) => new Promise((resolve, reject) => {
    const timerId = setTimeout(() => reject(new Error('Time out!')), 3000);

    socketRef.current.volatile.emit(event, payload, (response) => {
      clearTimeout(timerId);
      resolve(response);
    });
  });

  const sendMessage = (message) => getPromiseByEvent('newMessage', message);

  const sendChannel = (channel) => getPromiseByEvent('newChannel', channel);

  return { connected, sendMessage, sendChannel };
};

export default useChat;
