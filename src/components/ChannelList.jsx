import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

import { selectChannelList } from '../store/reducers/channelsSlice.js';

import Channel from './Channel.jsx';

const ChannelList = ({ currentChannelId }) => {
  const channels = useSelector(selectChannelList);
  const { t } = useTranslation();

  return (
    <>
      <div className="d-flex justify-content-between align-items-center ps-3 pe-1">
        <h3 className="m-0 fs-5">{t('elements.channels')}</h3>
        <Button
          variant="contained"
          size="sm"
          className="text-reset"
          title={t('tooltips.addChannel')}
        >
          <IoIosAddCircleOutline size="1.75em" />
        </Button>
      </div>
      <ul className="mt-1 list-unstyled">
        {channels.map((channel) => {
          const { id } = channel;
          return (
            <Channel key={id} channel={channel} current={id === currentChannelId} />
          );
        })}
      </ul>
    </>
  );
};

export default ChannelList;
