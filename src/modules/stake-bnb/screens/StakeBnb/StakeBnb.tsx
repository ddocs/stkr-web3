import { Query, useMutation } from '@redux-requests/react';
import React, { useCallback } from 'react';
import { useHistory, useParams } from 'react-router';
import { getStakerDashboardBnbPath } from '../../../../common/const';
import { t } from '../../../../common/utils/intl';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { IStakePayload, StakeForm } from '../../../stake/components/StakeForm';
import { IBnbStatsData, StakeBnbActions } from '../../actions/StakeBnbActions';

const BNB_STAKING_AMOUNT_STEP = 0.1;
const BNB_MIN_AMOUNT = 1;

export const StakeBnb = () => {
  const dispatch = useRequestDispatch();
  const { push, goBack } = useHistory();
  const { id: walletAccountId } = useParams<{ id: string }>();

  const { loading } = useMutation({
    type: StakeBnbActions.delegate.toString(),
  });

  const handleSubmit = ({ amount }: IStakePayload) => {
    dispatch(StakeBnbActions.delegate(walletAccountId, amount)).then(data => {
      if (!data.error) {
        push(getStakerDashboardBnbPath(walletAccountId));
      }
    });
  };

  const handleCancel = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <>
      <MutationErrorHandler type={StakeBnbActions.delegate.toString()} />
      <Query<IBnbStatsData> type={StakeBnbActions.fetchStats.toString()}>
        {({ data }) => (
          <StakeForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            balance={data.walletBalance}
            stakingAmountStep={BNB_STAKING_AMOUNT_STEP}
            minAmount={BNB_MIN_AMOUNT}
            loading={loading}
            currency={t('unit')}
          />
        )}
      </Query>
    </>
  );
}; //s
