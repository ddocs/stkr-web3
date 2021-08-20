import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';

import { t } from '../../../../common/utils/intl';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { useSupportProjectStyles } from './SupportProjectStyles';
import { getParachainBondsCrowdloansPath } from '../../../../common/const';
import { NavLink } from '../../../../UiKit/NavLink';
import { SupportProjectForm } from './components/SupportProjectForm/SupportProjectForm';
import { useCrowdloanById } from '../../hooks/useCrowdloans';
import { QueryLoading } from '../../../../components/QueryLoading/QueryLoading';
import { useSlotAuctionSdk } from '../../hooks/useSlotAuctionSdk';

export interface FormPayload {
  agreement: boolean;
  contributeValue: string;
}

export const SupportProject = () => {
  const classes = useSupportProjectStyles();

  const history = useHistory();

  const { network, id } = useParams<{ network: string; id: string }>();

  const { isConnected } = useSlotAuctionSdk();

  const ParachainBondsCrowdloansPath = getParachainBondsCrowdloansPath(network);
  const loanId = Number.parseInt(id);

  const goToParachainBondsCrowdloans = () => {
    history.push(ParachainBondsCrowdloansPath);
  };

  if (Number.isNaN(loanId) || !isConnected) {
    goToParachainBondsCrowdloans();
  }

  const { crowdloan, isLoading } = useCrowdloanById(loanId);

  return isLoading ? (
    <QueryLoading />
  ) : (
    <div className={classes.container}>
      <IconButton className={classes.close}>
        <NavLink href={ParachainBondsCrowdloansPath}>
          <CancelIcon size="xmd" />
        </NavLink>
      </IconButton>
      <Typography variant="h2" className={classes.title}>
        {t('polkadot-slot-auction.supportProject.title', {
          value: crowdloan.projectName,
        })}
      </Typography>
      <SupportProjectForm
        crowdloan={crowdloan}
        goToParachainBondsCrowdloans={goToParachainBondsCrowdloans}
      />
    </div>
  );
};
