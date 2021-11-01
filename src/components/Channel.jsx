import React from 'react';
import cn from 'classnames';
import { Button } from 'react-bootstrap';
import { RiHashtag } from 'react-icons/ri';

const Channel = ({ channel, current }) => {
  const { name } = channel;
  const channelClass = cn(
    'ps-4',
    current && 'bg-dark',
  );
  const buttonClass = cn(
    'fs-6',
    !current && 'text-reset',
  );

  return (
    <li className={channelClass}>
      <Button variant="contained" size="sm" className={buttonClass}>
        <RiHashtag size="1.5em" className="pe-2" />
        <span>{name}</span>
      </Button>
    </li>
  );
};

export default Channel;
