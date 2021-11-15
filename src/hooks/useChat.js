import {
  useState, useEffect, useRef, useContext,
} from 'react';
import { useDispatch } from 'react-redux';
import { useRollbar } from '@rollbar/react';

import socketContext from '../contexts/socketContext.js';
import { addMessage } from '../store/reducers/messagesSlice.js';
import { addChannel, renameChannel, removeChannel } from '../store/reducers/channelsSlice.js';

const useChat = () => {
  const [connected, setConnected] = useState(false);
  const { socketClient } = useContext(socketContext);
  const dispatch = useDispatch();
  const socketRef = useRef();
  const rollbar = useRollbar();

  useEffect(() => {
    socketRef.current = socketClient();
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
    socketRef.current.on('renameChannel', (channel) => {
      console.log('Chat: channel renamed');
      dispatch(renameChannel(channel));
    });
    socketRef.current.on('removeChannel', (channel) => {
      console.log('Chat: channel removed');
      dispatch(removeChannel(channel));
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const getPromiseByEvent = (event, payload) => new Promise((resolve, reject) => {
    const timerId = setTimeout(() => reject(new Error('Time out!')), 3000);

    socketRef.current.volatile.emit(event, payload, (response) => {
      clearTimeout(timerId);
      if (response.status === 'ok') {
        resolve(response);
      } else {
        rollbar.error('Server error', { event, payload, response });
        reject(new Error('Server error'));
      }
    });
  });

  const sendMessage = (message) => getPromiseByEvent('newMessage', message);

  const sendChannel = (channel) => getPromiseByEvent('newChannel', channel);

  const sendChangedChannel = (channel) => getPromiseByEvent('renameChannel', channel);

  const sendRemovedChannel = (channel) => getPromiseByEvent('removeChannel', channel);

  return {
    connected, sendMessage, sendChannel, sendChangedChannel, sendRemovedChannel,
  };
};

export default useChat;
