import { Box } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React, { ReactNode, useCallback } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { DEFAULT_FIXED } from '../../../../common/const';
import { FormErrors } from '../../../../common/types/FormErrors';
import { t } from '../../../../common/utils/intl';
import { QueryLoading } from '../../../../components/QueryLoading/QueryLoading';
import { Button } from '../../../../UiKit/Button';
import { InputField } from '../../../../UiKit/InputField';
import { Body2 } from '../../../../UiKit/Typography';
import { BigButton } from '../BigButton';
import { useBridgeFormStyles } from './BridgeFormStyles';

const MIN_AMOUNT = 0;

export interface IBridgeFormValues {
  amount: string | number;
  address: string;
  txHash: string;
}

export interface iBridgeFormProps {
  balance?: BigNumber;
  balanceType?: string;
  onSubmit: (values: IBridgeFormValues) => void;
  submitDisabled?: boolean;
  additionalText?: ReactNode;
  isBalanceLoading?: boolean;
  isLoading?: boolean;
}

export const BridgeForm = ({
  balance,
  balanceType = 'aETHc',
  onSubmit,
  submitDisabled = false,
  additionalText,
  isBalanceLoading = false,
  isLoading = false,
}: iBridgeFormProps) => {
  const classes = useBridgeFormStyles();
  const zeroBalance = new BigNumber(0);
  const withBalance = !!balance;
  const withHashField = !withBalance && !isBalanceLoading;
  const maxAmount = balance || zeroBalance;
  const roundedBalance = balance
    ? balance.decimalPlaces(DEFAULT_FIXED).toFormat()
    : '0';

  const validate = useCallback(
    ({ amount, address, txHash }: IBridgeFormValues) => {
      const currentAmount = new BigNumber(amount);
      const minAmount = new BigNumber(MIN_AMOUNT);
      const errors: FormErrors<IBridgeFormValues> = {};
      const isAddress =
        address && address.length === 42 && address.slice(0, 2) === '0x';
      const isTransaction =
        txHash && txHash.length === 66 && txHash.slice(0, 2) === '0x';

      if (!amount) {
        errors.amount = t('validation.required');
      } else if (currentAmount.isNaN()) {
        errors.amount = t('validation.numberOnly');
      } else if (currentAmount.isLessThanOrEqualTo(minAmount)) {
        errors.amount = t('validation.min', {
          value: MIN_AMOUNT,
        });
      } else if (withBalance && currentAmount.isGreaterThan(maxAmount)) {
        errors.amount = t('validation.max', {
          value: maxAmount,
        });
      }

      if (withHashField) {
        if (!txHash) {
          errors.txHash = t('validation.required');
        } else if (!isTransaction) {
          errors.txHash = t('validation.invalid-txn-format');
        }
      }

      if (!address) {
        errors.address = t('validation.required');
      } else if (!isAddress) {
        errors.address = t('validation.invalid-address-format');
      }

      return errors;
    },
    [maxAmount, withBalance, withHashField],
  );

  const renderForm = ({
    handleSubmit,
    form,
  }: FormRenderProps<IBridgeFormValues>) => {
    return (
      <form onSubmit={handleSubmit} autoComplete="off">
        <Box mb={4}>
          {(withBalance || isBalanceLoading) && (
            <Body2 className={classes.balance} color="textSecondary">
              {t('cross-chain-bridge.form.balance')}:{' '}
              {isBalanceLoading ? (
                <div className={classes.loadingBox}>
                  <QueryLoading size={16} />
                </div>
              ) : (
                `${roundedBalance} ${balanceType}`
              )}
            </Body2>
          )}

          <Field
            classes={{ root: classes.input }}
            component={InputField}
            name="amount"
            label={t('cross-chain-bridge.form.amount')}
            placeholder="0"
            variant="outlined"
            disabled={submitDisabled}
            InputProps={{
              endAdornment: withBalance && (
                <Button
                  className={classes.maxBtn}
                  variant="outlined"
                  size="small"
                  color="secondary"
                  onClick={form.mutators.setMax}
                  disabled={submitDisabled}
                >
                  {t('cross-chain-bridge.form.btn-max')}
                </Button>
              ),
            }}
            fullWidth
          />
        </Box>

        <Box mb={4}>
          <Field
            classes={{ root: classes.input }}
            component={InputField}
            name="address"
            label={t('cross-chain-bridge.form.address')}
            variant="outlined"
            disabled={submitDisabled}
            fullWidth
          />
        </Box>

        {withHashField && (
          <Box mb={4}>
            <Field
              classes={{ root: classes.input }}
              component={InputField}
              name="txHash"
              label={t('cross-chain-bridge.form.txHash')}
              variant="outlined"
              disabled={submitDisabled}
              fullWidth
            />
          </Box>
        )}

        <Box textAlign="center" mt={8}>
          {additionalText && (
            <Body2 className={classes.additionalText} color="textSecondary">
              {additionalText}
            </Body2>
          )}

          <BigButton
            type="submit"
            disabled={submitDisabled}
            isLoading={isLoading}
          >
            {t('cross-chain-bridge.form.btn-next')}
          </BigButton>
        </Box>
      </form>
    );
  };

  return (
    <Form
      mutators={{
        setMax: (_args, state, utils) => {
          utils.changeValue(state, 'amount', () => maxAmount.toString());
        },
      }}
      validate={validate}
      onSubmit={onSubmit}
      render={renderForm}
    />
  );
};
