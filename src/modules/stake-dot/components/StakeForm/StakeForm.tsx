import { Box, IconButton, Tooltip } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React, { useCallback } from 'react';
import { t } from '../../../../common/utils/intl';
import { QuestionIcon } from '../../../../UiKit/Icons/QuestionIcon';
import { StakeDescriptionContainer } from '../../../stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from '../../../stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from '../../../stake/components/StakeDescriptionValue';
import {
  IStakeFormComponentProps,
  StakeForm as BasicStakeForm,
} from '../../../stake/components/StakeForm';

const FIXED_DECIMAL_PLACES = 4;
export const POLKADOT_STAKING_AMOUNT_STEP = 0.5;
// todo: remove hardcode
const yearlyInterest = new BigNumber(0.1);

const ENABLE_YEARLY_EARNING = false;

interface IStakeFormProps
  extends Omit<
    IStakeFormComponentProps,
    'stakingAmountStep' | 'currency' | 'renderStats' | 'stakeInfo' | 'balance'
  > {
  balance: BigNumber;
}

export const StakeForm = ({
  onSubmit,
  onCancel,
  balance,
  loading,
}: IStakeFormProps) => {
  const renderStats = useCallback(
    (amount: number | undefined = 0) => {
      const totalValue = getTotalValue(amount, balance);

      return (
        <StakeDescriptionContainer>
          {ENABLE_YEARLY_EARNING && (
            <>
              <StakeDescriptionName>
                {t('stake.yearly-earning')}

                <Tooltip title={t('stake-dot.stake-dialog.earning-tooltip')}>
                  <Box component={IconButton} padding={1}>
                    <QuestionIcon size="xs" />
                  </Box>
                </Tooltip>
              </StakeDescriptionName>

              <StakeDescriptionValue>
                {t('unit.~dot-value', {
                  value: new BigNumber(amount)
                    .multipliedBy(yearlyInterest)
                    .decimalPlaces(FIXED_DECIMAL_PLACES)
                    .toFormat(),
                })}
              </StakeDescriptionValue>
            </>
          )}

          <StakeDescriptionName>
            {t('stake-dot.stake-dialog.will-get')}

            <Tooltip title={t('stake-dot.stake-dialog.get-tooltip')}>
              <Box component={IconButton} padding={1}>
                <QuestionIcon size="xs" />
              </Box>
            </Tooltip>
          </StakeDescriptionName>

          <StakeDescriptionValue>
            {t('unit.adotb-value', {
              value: totalValue,
            })}
          </StakeDescriptionValue>
        </StakeDescriptionContainer>
      );
    },
    [balance],
  );

  return (
    <BasicStakeForm
      onSubmit={onSubmit}
      onCancel={onCancel}
      balance={balance}
      stakingAmountStep={POLKADOT_STAKING_AMOUNT_STEP}
      currency={t('unit.dot')}
      loading={loading}
      renderStats={renderStats}
      stakeInfo={t('stake-dot.stake-dialog.info')}
      maxAmount={Math.floor(balance.toNumber())}
    />
  );
};

function getTotalValue(amount: number, balance: BigNumber) {
  if (amount < 0) {
    return 0;
  } else if (balance.isLessThan(`${amount}`)) {
    return POLKADOT_STAKING_AMOUNT_STEP;
  } else {
    return amount;
  }
}
