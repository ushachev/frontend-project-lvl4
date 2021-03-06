import { useContext } from 'react';
import { useRollbar } from '@rollbar/react';

import socketContext from '../contexts/socketContext.js';

const useChat = () => {
  const { socket } = useContext(socketContext);
  const rollbar = useRollbar();

  const connectSocket = () => {
    socket.connect?.();
  };

  const disconnectSocket = () => {
    socket.disconnect();
  };

  const promisifyEvent = (event, payload) => new Promise((resolve, reject) => {
    const timerId = setTimeout(() => reject(new Error('Time out!')), 3000);

    socket.volatile.emit(event, payload, (response) => {
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
    connectSocket,
    disconnectSocket,
    sendMessage,
    sendChannel,
    sendChangedChannel,
    sendRemovedChannel,
  };
};

export default useChat;
