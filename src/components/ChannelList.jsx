import React from 'react';
import { useSelector } from 'react-redux';

import { selectChannelList } from '../store/reducers/channelsSlice.js';
import { selectCurrentChannelId } from '../store/reducers/currentChannelSlice.js';

import Channel from './Channel.jsx';

const ChannelList = () => {
  const currentChannelId = useSelector(selectCurrentChannelId);
  const channels = useSelector(selectChannelList);

  return (
    <ul>
      {channels.map((channel) => {
        const { id } = channel;
        return (
          <Channel key={id} channel={channel} current={id === currentChannelId} />
        );
      })}
    </ul>
  );
};

export default ChannelList;
