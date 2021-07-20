import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import { useParams } from 'react-router';

import { t } from '../../../../common/utils/intl';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { useSupportProjectStyles } from './SupportProjectStyles';
import { INDEX_PATH } from '../../../../common/const';
import { NavLink } from '../../../../UiKit/NavLink';
import { SupportProjectForm } from './components/SupportProjectForm/SupportProjectForm';

export interface FormPayload {
  agreement: boolean;
  contributeValue: string;
}

interface SupportProjectProps {
  projectName: string;
  onClose?: () => void;
}
export const SupportProject = ({ onClose }: SupportProjectProps) => {
  const classes = useSupportProjectStyles();
  const { name } = useParams<{ id: string; name: string }>();

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={classes.container}>
      <IconButton className={classes.close}>
        <NavLink href={INDEX_PATH}>
          <CancelIcon size="xmd" onClick={handleClose} />
        </NavLink>
      </IconButton>
      <Typography variant="h2" className={classes.title}>
        {t('polkadot-slot-auction.supportProject.title', {
          value: name,
        })}
      </Typography>
      <SupportProjectForm />
    </div>
  );
};
