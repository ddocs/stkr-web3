import {
  Button,
  Paper,
  Typography,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import React, { useCallback, useMemo, useState } from 'react';
import { useConvertStyles } from './ConvertStyles';
import { t } from '../../../../common/utils/intl';
import BigNumber from 'bignumber.js';
// import { ConvertDialog } from '../ConvertDialog';
import { AvalancheActions } from '../../../../store/actions/AvalancheActions';
import { Mutation } from '@redux-requests/react';
import { ConfirmConvertDialog } from '../ConfirmConvertDialog';
import { IConvertEstimates, StakingStep } from '../../../avalanche-sdk/types';
import { getStakingSession } from '../../../avalanche-sdk/utils';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import { QuestionIcon } from '../../../../UiKit/Icons/QuestionIcon';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';

interface IConvertProps {
  amount: BigNumber;
  network: string;
  onSuccess: () => void;
}

export const Convert = ({ amount, onSuccess }: IConvertProps) => {
  const classes = useConvertStyles();
  const [convertEstimates, setConvertEstimates] = useState<
    IConvertEstimates | undefined
  >();

  const dispatch = useRequestDispatch();

  const isPendingClaim = useMemo(
    () => getStakingSession()?.nextStep === StakingStep.WithdrawAAvaxB,
    [],
  );

  const handleWithdraw = useCallback(() => {
    dispatch(AvalancheActions.withdrawAAvaxB()).then(data => {
      if (!data.error) {
        onSuccess();
      }
    });
  }, [dispatch, onSuccess]);

  // const handleReceivedEstimates = useCallback(
  //   (estimates: IConvertEstimates) => {
  //     setConvertEstimates(estimates);
  //   },
  //   [],
  // );

  const handleConvertSubmit = useCallback(() => {
    setConvertEstimates(undefined);
  }, []);

  const renderButtons = useCallback(() => {
    if (isPendingClaim) {
      return (
        <>
          <Mutation type={AvalancheActions.withdrawAAvaxB.toString()}>
            {({ loading }) => (
              <Button
                color="primary"
                size="large"
                className={classes.button}
                onClick={handleWithdraw}
                disabled={loading}
              >
                {t('stake-avax.convert.finish-claim')}
              </Button>
            )}
          </Mutation>
          <MutationErrorHandler
            type={AvalancheActions.withdrawAAvaxB.toString()}
          />
        </>
      );
    }

    return (
      <div>
        <Button
          color="primary"
          size="large"
          className={classes.button}
          disabled={true}
        >
          {t('stake-avax.convert.convert')}
        </Button>
        <Tooltip title={t('stake-avax.convert.claim-summary')}>
          <IconButton className={classes.question}>
            <QuestionIcon size="xs" />
          </IconButton>
        </Tooltip>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPendingClaim]);
  return (
    <Paper variant="outlined" square={false} classes={{ root: classes.root }}>
      <Typography variant="body1" className={classes.header}>
        {t('stake-avax.dashboard.aavaxb-balance')}
      </Typography>
      <div className={classes.footer}>
        {amount && <Typography variant="h2">{amount.toFixed(2)}</Typography>}
        <div>{renderButtons()}</div>
      </div>
      {convertEstimates && (
        <ConfirmConvertDialog
          onSubmit={handleConvertSubmit}
          amount={convertEstimates.amount}
          address={convertEstimates.address}
          estimate={convertEstimates.estimate}
        />
      )}
    </Paper>
  );
};
