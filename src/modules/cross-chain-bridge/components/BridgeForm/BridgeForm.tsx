import { Box } from '@material-ui/core';
import React, { useCallback } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { FormErrors } from '../../../../common/types/FormErrors';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import { InputField } from '../../../../UiKit/InputField';
import { Body2 } from '../../../../UiKit/Typography';
import { BigButton } from '../BigButton';
import { useBridgeFormStyles } from './BridgeFormStyles';

const MIN_AMOUNT = 0;

export interface IBridgeFormValues {
  amount: string | number;
  address: string;
}

export interface iBridgeFormProps {
  balance?: string | number;
  balanceType?: string;
  onSubmit: (values: IBridgeFormValues) => void;
  submitDisabled?: boolean;
  additionalText?: string;
}

export const BridgeForm = ({
  balance = '0',
  balanceType = 'aETH',
  onSubmit,
  submitDisabled = false,
  additionalText,
}: iBridgeFormProps) => {
  const classes = useBridgeFormStyles();
  const maxAmount = +balance;

  const validate = useCallback(
    ({ amount, address }: IBridgeFormValues) => {
      const errors: FormErrors<IBridgeFormValues> = {};
      const isAddress =
        address && address.length === 42 && address.slice(0, 2) === '0x';

      if (!amount) {
        errors.amount = t('validation.required');
      } else if (isNaN(+amount)) {
        errors.amount = t('validation.numberOnly');
      } else if (+amount <= MIN_AMOUNT) {
        errors.amount = t('validation.min', {
          value: MIN_AMOUNT,
        });
      } else if (+amount > maxAmount) {
        errors.amount = t('validation.max', {
          value: maxAmount,
        });
      }

      if (!address) {
        errors.address = t('validation.required');
      } else if (!isAddress) {
        errors.address = t('validation.invalid-address-format');
      }

      return errors;
    },
    [maxAmount],
  );

  const renderForm = ({
    handleSubmit,
    form,
  }: FormRenderProps<IBridgeFormValues>) => {
    return (
      <form onSubmit={handleSubmit} autoComplete="off">
        <Box mb={4}>
          <Body2 className={classes.balance} color="textSecondary">
            {t('cross-chain-bridge.form.balance')}: {balance} {balanceType}
          </Body2>

          <Field
            classes={{ root: classes.input }}
            component={InputField}
            name="amount"
            label={t('cross-chain-bridge.form.amount')}
            placeholder="0"
            variant="outlined"
            disabled={submitDisabled}
            InputProps={{
              endAdornment: (
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
            placeholder="0x63c6c732d603338AB1AeBA137aA79CDa6EFfb350"
            variant="outlined"
            disabled={submitDisabled}
            fullWidth
          />
        </Box>

        <Box textAlign="center" mt={8}>
          {additionalText && (
            <Body2 className={classes.additionalText} color="textSecondary">
              {additionalText}
            </Body2>
          )}

          <BigButton type="submit" disabled={submitDisabled}>
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
          utils.changeValue(state, 'amount', () => maxAmount);
        },
      }}
      validate={validate}
      onSubmit={onSubmit}
      render={renderForm}
    />
  );
};
