import React from 'react';
import { Button } from 'react-bootstrap';
import { IoMdMore } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

const CustomToggle = React.forwardRef(({ onClick }, ref) => {
  const { t } = useTranslation();

  return (
    <Button
      ref={ref}
      onClick={onClick}
      variant="contained"
      size="sm"
      className="text-reset"
      title={t('tooltips.moreActions')}
    >
      <IoMdMore size="2em" />
    </Button>
  );
});

export default CustomToggle;
