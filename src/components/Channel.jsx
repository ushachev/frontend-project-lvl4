import React from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { Button } from 'react-bootstrap';
import { RiHashtag } from 'react-icons/ri';

import { setCurrentChannelId } from '../store/reducers/currentChannelSlice.js';

const Channel = ({ channel, current }) => {
  const dispatch = useDispatch();

  const { id, name } = channel;
  const channelClass = cn(
    'channel',
    current && 'bg-dark',
  );
  const buttonClass = cn(
    'w-100 ps-4 fs-6 text-start',
    !current && 'text-reset',
  );

  const handleClick = () => dispatch(setCurrentChannelId(id));

  return (
    <li className={channelClass}>
      <Button variant="contained" size="sm" className={buttonClass} onClick={handleClick}>
        <RiHashtag className="me-2" />
        <span>{name}</span>
      </Button>
    </li>
  );
};

export default Channel;
