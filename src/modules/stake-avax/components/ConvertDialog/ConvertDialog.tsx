import {
  Box,
  Container,
  Dialog,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { FormApi } from 'final-form';
import React, { useCallback } from 'react';
import { Field, Form } from 'react-final-form';
import { FormErrors } from '../../../../common/types/FormErrors';
import { t } from '../../../../common/utils/intl';
import { QueryLoading } from '../../../../components/QueryLoading/QueryLoading';
import { Spinner } from '../../../../components/Spinner';
import { Button } from '../../../../UiKit/Button';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { InputField } from '../../../../UiKit/InputField';
import { useConvertDialogStyles } from './useConvertDialogStyles';

const DEFAULT_FIXED = 4;
const MIN_AMOUNT = 0;
const CONVERT_FORM_ID = 'convert-form';

export interface IConvertFormValues {
  amount: string | number;
  address: string;
}

interface IConvertDialogProps {
  isOpened?: boolean;
  balance?: BigNumber;
  isLoading?: boolean;
  submitDisabled?: boolean;
  isBalanceLoading?: boolean;
  onClose?: () => void;
  onSubmit: (values: IConvertFormValues) => void;
}

export const ConvertDialog = ({
  isOpened = false,
  isBalanceLoading,
  isLoading,
  submitDisabled,
  balance,
  onClose,
  onSubmit,
}: IConvertDialogProps) => {
  const classes = useConvertDialogStyles();
  const zeroBalance = new BigNumber(0);
  const maxAmount = balance || zeroBalance;
  const withBalance = !!balance;
  const withAddress = true;
  const roundedBalance = balance
    ? balance.decimalPlaces(DEFAULT_FIXED).toFormat()
    : '0';

  const setMaxAmount = useCallback(
    (form: FormApi<IConvertFormValues>, maxAmount: string) => () =>
      form.change('amount', maxAmount),
    [],
  );

  const validate = useCallback(
    ({ amount, address }: IConvertFormValues) => {
      const currentAmount = new BigNumber(amount);
      const minAmount = new BigNumber(MIN_AMOUNT);
      const errors: FormErrors<IConvertFormValues> = {};
      const isAddress =
        address && address.length === 42 && address.slice(0, 2) === '0x';

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

      if (withAddress) {
        if (!address) {
          errors.address = t('validation.required');
        } else if (!isAddress) {
          errors.address = t('validation.invalid-address-format');
        }
      }

      return errors;
    },
    [maxAmount, withAddress, withBalance],
  );

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ square: false }}
      classes={{ paper: classes.root }}
      scroll="body"
    >
      <Container className={classes.container}>
        <Typography variant="h3" className={classes.title}>
          {t('stake-avax.convert.title')}
        </Typography>

        <Form
          validate={validate}
          onSubmit={onSubmit}
          render={({ handleSubmit, form, values }) => (
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              id={CONVERT_FORM_ID}
            >
              <Box mb={4}>
                {(withBalance || isBalanceLoading) && (
                  <Typography
                    variant="body2"
                    className={classes.balance}
                    color="textSecondary"
                  >
                    {t('cross-chain-bridge.form.balance')}:{' '}
                    {isBalanceLoading ? (
                      <div className={classes.balanceLoadingBox}>
                        <QueryLoading size={16} />
                      </div>
                    ) : (
                      `${roundedBalance} aAVAXb`
                    )}
                  </Typography>
                )}

                <Field
                  classes={{ root: classes.input }}
                  component={InputField}
                  name="amount"
                  label={t('stake-avax.convert.amount')}
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
                        onClick={setMaxAmount(form, maxAmount.toFormat())}
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
                  label={t('stake-avax.convert.address')}
                  variant="outlined"
                  disabled={submitDisabled}
                  fullWidth
                />
              </Box>
            </form>
          )}
        />
      </Container>

      <div className={classes.footer}>
        <Container className={classes.container}>
          {isLoading ? (
            <Grid container spacing={3} alignItems="center">
              <Grid item xs>
                <Typography
                  className={classes.info}
                  variant="body2"
                  color="textSecondary"
                >
                  {t('stake-avax.claim.info')}
                </Typography>
              </Grid>

              <Grid item xs="auto">
                <Spinner size={32} />
              </Grid>
            </Grid>
          ) : (
            <div className={classes.btnWrapper}>
              <Button
                type="submit"
                size="large"
                color="primary"
                form={CONVERT_FORM_ID}
                fullWidth
                disabled={submitDisabled}
                isLoading={isLoading}
              >
                {t('stake-avax.convert.convert')}
              </Button>
            </div>
          )}
        </Container>
      </div>

      <IconButton className={classes.closeBtn} onClick={onClose}>
        <CancelIcon size="xmd" />
      </IconButton>
    </Dialog>
  );
};
