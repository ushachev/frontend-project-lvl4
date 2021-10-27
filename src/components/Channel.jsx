import React from 'react';
import cn from 'classnames';

const Channel = ({ channel, current }) => {
  const { name } = channel;
  const channelClass = cn(current && 'fw-bold');

  return (
    <li className={channelClass}>{name}</li>
  );
};

export default Channel;
