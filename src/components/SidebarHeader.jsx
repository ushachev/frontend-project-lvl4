import React from 'react';
import { Button } from 'react-bootstrap';
import { IoIosLogOut } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks/useAuth.js';

const SidebarHeader = ({ username }) => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-between align-items-center ps-4 py-3 pe-1">
      <span
        className="flex-shrink-1 fs-5 fw-bold text-truncate"
        title={username}
      >
        {`@${username}`}
      </span>
      <Button
        variant="contained"
        size="sm"
        className="text-reset"
        onClick={auth.logOut}
        title={t('tooltips.logout')}
      >
        <IoIosLogOut size="2em" />
      </Button>
    </div>
  );
};

export default SidebarHeader;
