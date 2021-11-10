import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

import { selectChannelList } from '../store/reducers/channelsSlice.js';
import { selectUi, setChannelListScroll } from '../store/reducers/uiSlice.js';
import { setModal } from '../store/reducers/modalSlice.js';

import Channel from './Channel.jsx';

const ChannelList = ({ currentChannelId }) => {
  const dispatch = useDispatch();
  const scrollableNodeRef = useRef();
  const channels = useSelector(selectChannelList);
  const ui = useSelector(selectUi);
  const { t } = useTranslation();

  useEffect(() => {
    const { current: channelListEl } = scrollableNodeRef;

    switch (ui.channelList) {
      case 'scrollDown':
        channelListEl.scrollTop = channelListEl.scrollHeight - channelListEl.clientHeight;
        dispatch(setChannelListScroll('scrollNone'));
        break;

      case 'scrollNone':
        break;

      default:
        throw Error(`Unknown channel list ui state: ${ui.channelList}`);
    }
  }, [channels]);

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
        </Button>
      </div>
      <div className="mt-1 overflow-hidden">
        <SimpleBar scrollableNodeProps={{ ref: scrollableNodeRef }} className="mh-100">
          <ul className="list-unstyled">
            {channels.map((channel) => {
              const { id } = channel;
              return (
                <Channel key={id} channel={channel} current={id === currentChannelId} />
              );
            })}
          </ul>
        </SimpleBar>
      </div>
    </>
  );
};

export default ChannelList;
