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
import { Button } from '../../../../UiKit/Button';
import { AvaxIcon } from '../../../../UiKit/Icons/AvaxIcon';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { InputField } from '../../../../UiKit/InputField';
import { Timer } from '../../../governance/components/Timer';
import { useUnstakeDialogStyles } from './useUnstakeDialogStyles';

const DEFAULT_FIXED = 4;
const MIN_AMOUNT = 0;
const UNSTAKE_FORM_ID = 'unstake-form';

const getProfitValue = (maxValue: BigNumber, value: BigNumber) => {
  if (value.isNaN()) {
    return 0;
  }

  if (value.isGreaterThan(maxValue)) {
    return maxValue.toFormat();
  }

  return value.toFormat();
};

export interface IUnstakeFormValues {
  amount: string | number;
}

interface IUnstakeDialogProps {
  isOpened?: boolean;
  balance?: BigNumber;
  isLoading?: boolean;
  submitDisabled?: boolean;
  isBalanceLoading?: boolean;
  onClose?: () => void;
  onSubmit: (values: IUnstakeFormValues) => void;
  endDate?: Date;
}

export const UnstakeDialog = ({
  isOpened = false,
  isBalanceLoading,
  isLoading,
  submitDisabled,
  balance,
  onClose,
  onSubmit,
  endDate,
}: IUnstakeDialogProps) => {
  const classes = useUnstakeDialogStyles();
  const zeroBalance = new BigNumber(0);
  const maxAmount = balance || zeroBalance;
  const withBalance = !!balance;
  const roundedBalance = balance
    ? balance.decimalPlaces(DEFAULT_FIXED).toFormat()
    : '0';

  const setMaxAmount = useCallback(
    (form: FormApi<IUnstakeFormValues>, maxAmount: string) => () =>
      form.change('amount', maxAmount),
    [],
  );

  const validate = useCallback(
    ({ amount }: IUnstakeFormValues) => {
      const currentAmount = new BigNumber(amount);
      const minAmount = new BigNumber(MIN_AMOUNT);
      const errors: FormErrors<IUnstakeFormValues> = {};

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

      return errors;
    },
    [maxAmount, withBalance],
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
          {t('stake-avax.unstake.title')}
        </Typography>

        <Form
          validate={validate}
          onSubmit={onSubmit}
          render={({ handleSubmit, form, values }) => (
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              id={UNSTAKE_FORM_ID}
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
                  disabled={false}
                  InputProps={{
                    endAdornment: withBalance && (
                      <Button
                        className={classes.maxBtn}
                        variant="outlined"
                        size="small"
                        color="secondary"
                        onClick={setMaxAmount(form, maxAmount.toString())}
                        disabled={false}
                      >
                        {t('cross-chain-bridge.form.btn-max')}
                      </Button>
                    ),
                  }}
                  fullWidth
                />
              </Box>

              <Grid container alignItems="center" spacing={2}>
                <Grid item xs>
                  <Typography className={classes.profitLabel}>
                    {t('stake-avax.unstake.will-get')}
                  </Typography>
                </Grid>

                <Grid item xs="auto">
                  <Typography className={classes.profit}>
                    <span className={classes.profitValue}>
                      {getProfitValue(maxAmount, new BigNumber(values.amount))}
                    </span>

                    <Box mx={1} component="i" display="flex">
                      <AvaxIcon />
                    </Box>

                    {t('stake-avax.avax')}
                  </Typography>
                </Grid>
              </Grid>
            </form>
          )}
        />
      </Container>

      <div className={classes.footer}>
        <Container className={classes.container}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} sm>
              {endDate && (
                <Typography variant="body2" className={classes.info}>
                  {t('stake-avax.unstake.info')}
                  {` `}
                  <Timer
                    component="span"
                    className={classes.timer}
                    endTime={endDate}
                  />
                </Typography>
              )}
            </Grid>

            <Grid item xs sm={5}>
              <Button
                type="submit"
                size="large"
                color="primary"
                form={UNSTAKE_FORM_ID}
                fullWidth
                disabled={submitDisabled}
                isLoading={isLoading}
              >
                {t('stake-avax.unstake.btn')}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>

      <IconButton className={classes.closeBtn} onClick={onClose}>
        <CancelIcon size="xmd" />
      </IconButton>
    </Dialog>
  );
};
