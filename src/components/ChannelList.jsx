import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
// import SimpleBar from 'simplebar-react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

import { selectChannelList } from '../store/reducers/channelsSlice.js';
import {
  selectCurrentChannelId,
} from '../store/reducers/activeChannelSlice.js';
import { setModal } from '../store/reducers/modalSlice.js';

import Channel from './Channel.jsx';

const ChannelList = function ChannelList() {
  const dispatch = useDispatch();
  // const scrollableNodeRef = useRef();
  const channels = useSelector(selectChannelList);
  const currentChannelId = useSelector(selectCurrentChannelId);
  // const defaultChannelId = useSelector(selectDefaultChannelId);
  const { t } = useTranslation();

  // useEffect(() => {
  //   const { current: channelListEl } = scrollableNodeRef;
  //   const lastChannel = channels[channels.length - 1];

  //   if (currentChannelId === defaultChannelId) {
  //     channelListEl.scrollTop = 0;
  //     return;
  //   }

  //   if (currentChannelId === lastChannel?.id) {
  //     channelListEl.scrollTop = channelListEl.scrollHeight;
  //   }
  // }, [channels]);

  const handleAddChannel = () => {
    dispatch(setModal({ type: 'adding' }));
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center ps-3 pe-1">
        <h3 className="m-0 fs-5">{t('elements.channels')}</h3>
        <Button
          variant="contained"
          size="sm"
          className="text-reset"
          title={t('tooltips.addChannel')}
          onClick={handleAddChannel}
        >
          <IoIosAddCircleOutline size="1.75em" />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <div className="mt-1 overflow-hidden">
        <ul className="list-unstyled">
          {channels.map((channel) => {
            const { id } = channel;
            return (
              <Channel key={id} channel={channel} current={id === currentChannelId} />
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ChannelList;
