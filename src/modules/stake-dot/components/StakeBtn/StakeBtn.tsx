import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import React, { useCallback, useState } from 'react';
import { t } from '../../../../common/utils/intl';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { Button } from '../../../../UiKit/Button';
import { PlusIcon } from '../../../../UiKit/Icons/PlusIcon';
import { connect } from '../../actions/connect';
import {
  getAccountBalance,
  IAccountBalanceReply,
} from '../../actions/getAccountBalance';
import { sendToDeposit } from '../../actions/sendToDeposit';
import { StakeDialog } from '../StakeDialog';
import { StakeForm } from '../StakeForm';
import { useStakeBtnStyles } from './useStakeBtnStyles';

export const StakeBtn = () => {
  const dispatchRequest = useDispatchRequest();
  const classes = useStakeBtnStyles();
  const [isOpened, setIsOpened] = useState(false);

  const { loading: connectLoading } = useQuery({
    type: connect,
  });

  const {
    data: accountBalance,
    loading: accountBalanceLoading,
  } = useQuery<IAccountBalanceReply | null>({
    type: getAccountBalance,
  });

  const { loading: stakeLoading } = useMutation({
    type: sendToDeposit,
  });

  const handleOpen = () => {
    setIsOpened(true);
  };

  const handleClose = () => {
    setIsOpened(false);
  };

  const handleSubmit = useCallback(
    ({ amount }: { amount: number }) => {
      dispatchRequest(sendToDeposit(new BigNumber(amount))).then(
        ({ error }) => {
          if (!error) {
            handleClose();
          }
        },
      );
    },
    [dispatchRequest],
  );

  const btnLoading = connectLoading || accountBalanceLoading || stakeLoading;

  return (
    <>
      <Button
        className={classes.root}
        size="large"
        color="secondary"
        variant="outlined"
        onClick={handleOpen}
        classes={{
          startIcon: classes.icon,
        }}
        startIcon={btnLoading ? null : <PlusIcon />}
        isLoading={btnLoading}
        disabled={btnLoading}
      >
        {t('stake-dot.dashboard.stake-dot')}
      </Button>

      <MutationErrorHandler type={sendToDeposit.toString()} />

      {accountBalance && (
        <StakeDialog isOpened={isOpened} onClose={handleClose}>
          <StakeForm
            onCancel={handleClose}
            onSubmit={handleSubmit}
            balance={accountBalance.free}
            loading={stakeLoading}
          />
        </StakeDialog>
      )}
    </>
  );
};
