import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';

import { t } from '../../../../common/utils/intl';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { useSupportProjectStyles } from './SupportProjectStyles';
import { INDEX_PATH } from '../../../../common/const';
import { NavLink } from '../../../../UiKit/NavLink';
import { SupportProjectForm } from './components/SupportProjectForm/SupportProjectForm';
import { useCrowdloanById } from '../../hooks/useCrowdloans';
import { QueryLoading } from '../../../../components/QueryLoading/QueryLoading';
import { useSlotAuctionSdk } from '../../hooks/useSlotAuctionSdk';

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
  const { id } = useParams<{ id: string }>();

  const history = useHistory();
  const loanId = Number.parseInt(id);
  if (Number.isNaN(loanId)) {
    history.goBack();
  }
  const { isConnected } = useSlotAuctionSdk();
  if (!isConnected) {
    history.push(INDEX_PATH);
  }
  const { crowdloan, isLoading } = useCrowdloanById(loanId);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  if (isLoading) {
    return <QueryLoading />;
  }

  return (
    <div className={classes.container}>
      <IconButton className={classes.close}>
        <NavLink href={INDEX_PATH}>
          <CancelIcon size="xmd" onClick={handleClose} />
        </NavLink>
      </IconButton>
      <Typography variant="h2" className={classes.title}>
        {t('polkadot-slot-auction.supportProject.title', {
          value: crowdloan.projectName,
        })}
      </Typography>
      <SupportProjectForm crowdloan={crowdloan} />
    </div>
  );
};
