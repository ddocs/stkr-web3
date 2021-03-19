import React, { useCallback } from 'react';
import { IStakePayload, StakeForm } from '../../../stake/components/StakeForm';
import BigNumber from 'bignumber.js';
import { IBnbStatsData, StakeBnbActions } from '../../actions/StakeBnbActions';
import { useHistory, useParams } from 'react-router';
import {
  DEFAULT_FIXED,
  getStakerDashboardBnbPath,
} from '../../../../common/const';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import { Query, useMutation, useQuery } from '@redux-requests/react';
import { t, tHTML } from '../../../../common/utils/intl';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import { QuestionIcon } from '../../../../UiKit/Icons/QuestionIcon';
import { StakeDescriptionContainer } from '../../../stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from '../../../stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from '../../../stake/components/StakeDescriptionValue';

function renderValue(value: BigNumber) {
  return t('unit.bnb-value', {
    value,
  });
}

const BNB_STAKING_FEE_RATE = new BigNumber(1);
const BNB_STAKING_AMOUNT_STEP = 0.1;
const BNB_MIN_AMOUNT = 1;

export const StakeBnb = () => {
  const dispatch = useRequestDispatch();
  const { push, goBack } = useHistory();
  const { data } = useQuery<IBnbStatsData>({
    type: StakeBnbActions.fetchStats.toString(),
  });
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

  const yearlyInterest = 0.2;

  const renderStats = useCallback(
    (amount: number) => (
      <StakeDescriptionContainer>
        <StakeDescriptionName>
          {t('stake-bnb.description-name.unbounding-period')}
          <Tooltip title={t('stake-bnb.tooltip.unbounding-period')}>
            <Box component={IconButton} padding={1}>
              <QuestionIcon size="xs" />
            </Box>
          </Tooltip>
        </StakeDescriptionName>
        <StakeDescriptionValue>
          {t('stake-bnb.description-value.unbounding-period')}
        </StakeDescriptionValue>
        <StakeDescriptionName>
          {t('stake-bnb.description-name.earnings')}
          <Tooltip title={tHTML('stake-bnb.tooltip.earnings')}>
            <Box component={IconButton} padding={1}>
              <QuestionIcon size="xs" />
            </Box>
          </Tooltip>
        </StakeDescriptionName>
        <StakeDescriptionValue>
          {t('unit.~bnb-value', {
            value: data.apr
              .multipliedBy(amount)
              .multipliedBy(new BigNumber(1).minus(data.commissionRate))
              .decimalPlaces(DEFAULT_FIXED)
              .toFormat(),
          })}
        </StakeDescriptionValue>
      </StakeDescriptionContainer>
    ),
    [data.apr, data.commissionRate],
  );

  return (
    <>
      <MutationErrorHandler type={StakeBnbActions.delegate.toString()} />
      <Query<IBnbStatsData> type={StakeBnbActions.fetchStats.toString()}>
        {({ data }) => (
          <StakeForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            balance={data.walletBalance}
            yearlyInterest={yearlyInterest}
            stakingFeeRate={BNB_STAKING_FEE_RATE}
            stakingAmountStep={BNB_STAKING_AMOUNT_STEP}
            minAmount={BNB_MIN_AMOUNT}
            loading={loading}
            renderValue={renderValue}
            agreementElement={t('stake-bnb.agreement')}
            renderStats={renderStats}
          />
        )}
      </Query>
    </>
  );
}; //s
