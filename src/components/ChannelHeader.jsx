import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { IoMdMore } from 'react-icons/io';
import { RiHashtag } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';

import { selectCurrentChannel } from '../store/reducers/channelsSlice.js';

const ChannelHeader = () => {
  const { name } = useSelector(selectCurrentChannel);
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-between p-3 fs-5 fw-bold bg-dark bg-opacity-50">
      <div>
        <RiHashtag size="1.5em" className="pe-1" />
        <span>{name}</span>
      </div>
      <Button
        variant="contained"
        size="sm"
        className="text-reset"
        title={t('tooltips.moreActions')}
      >
        <IoMdMore size="2em" />
      </Button>
    </div>
  );
};

export default ChannelHeader;
