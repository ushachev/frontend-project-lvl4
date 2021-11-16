import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { RiHashtag } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';

import { setModal } from '../store/reducers/modalSlice.js';
import { selectCurrentChannel } from '../store/reducers/channelsSlice.js';

import CustomToggle from './CustomToggle.jsx';

const ChannelHeader = function ChannelHeader() {
  const dispatch = useDispatch();
  const { id, name, removable } = useSelector(selectCurrentChannel);
  const { t } = useTranslation();

  const handleRemoveChannel = () => {
    dispatch(setModal({ type: 'removing', item: { id } }));
  };

  const handleRenameChannel = () => {
    dispatch(setModal({ type: 'renaming', item: { id, name } }));
  };

  return (
    <div className="d-flex justify-content-between p-3 fs-5 fw-bold bg-body bg-opacity-50">
      <div>
        <RiHashtag size="1.5em" className="pe-1" />
        <span>{name}</span>
      </div>
      <Dropdown align="end">
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu>
          <Dropdown.Item as="button">{t('elements.info')}</Dropdown.Item>
          {removable && (
            <>
              <Dropdown.Item as="button" onClick={handleRemoveChannel}>
                {t('elements.remove')}
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={handleRenameChannel}>
                {t('elements.rename')}
              </Dropdown.Item>
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ChannelHeader;
