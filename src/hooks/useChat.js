import {
  useState, useEffect, useRef, useContext,
} from 'react';
import { useRollbar } from '@rollbar/react';

import socketContext from '../contexts/socketContext.js';

const useChat = () => {
  const [connected, setConnected] = useState(false);
  const { socket } = useContext(socketContext);
  const socketRef = useRef(socket);
  const rollbar = useRollbar();

  useEffect(() => {
    const connectListener = () => {
      setConnected(true);
    };
    const disconnectListener = () => {
      setConnected(false);
    };

    socketRef.current.on('connect', connectListener);
    socketRef.current.on('disconnect', disconnectListener);
    socketRef.current.connect?.();

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off('connect', connectListener);
      socketRef.current.off('disconnect', disconnectListener);
    };
  }, []);

  const promisifyEvent = (event, payload) => new Promise((resolve, reject) => {
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

  const sendMessage = (message) => promisifyEvent('newMessage', message);
  const sendChannel = (channel) => promisifyEvent('newChannel', channel);
  const sendChangedChannel = (channel) => promisifyEvent('renameChannel', channel);
  const sendRemovedChannel = (channel) => promisifyEvent('removeChannel', channel);

  return {
    connected, sendMessage, sendChannel, sendChangedChannel, sendRemovedChannel,
  };
};

export default useChat;
