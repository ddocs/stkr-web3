import { Hidden, IconButton, Paper } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React, { ReactNode, useCallback, useMemo } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { FormErrors } from '../../../../common/types/FormErrors';
import { floor } from '../../../../common/utils/floor';
import { t } from '../../../../common/utils/intl';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { UserActionTypes } from '../../../../store/actions/UserActions';
import { Button } from '../../../../UiKit/Button';
import { Curtains } from '../../../../UiKit/Curtains';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { CloseIcon } from '../../../../UiKit/Icons/CloseIcon';
import { SliderField } from '../../../../UiKit/RangeField';
import { Body2, Headline2 } from '../../../../UiKit/Typography';
import { useStakeFormStyles } from './StakeFormStyles';

export const MAX_AMOUNT = 32;

export interface IStakePayload {
  amount: number;
  agreement: boolean;
}

export interface IStakeFormComponentProps {
  onSubmit: (payload: IStakePayload) => void;
  onCancel: () => void;
  balance?: BigNumber;
  yearlyInterest: number;
  stakingFeeRate?: BigNumber;
  stakingAmountStep: number;
  minAmount?: number;
  loading: boolean;
  renderValue?: (value: BigNumber) => ReactNode;
  renderStats?: (amount: number) => ReactNode;
}

export const StakeForm = ({
  onSubmit,
  onCancel,
  balance,
  stakingAmountStep,
  minAmount = stakingAmountStep,
  loading,
  renderValue = value =>
    t('unit.eth-value', {
      value,
    }),
  renderStats,
}: IStakeFormComponentProps) => {
  const classes = useStakeFormStyles();

  const validateStakeForm = useCallback(
    ({ amount }: IStakePayload) => {
      const errors: FormErrors<IStakePayload> = {};

      if (!amount) {
        errors.amount = t('validation.required');
      } else if (balance?.isLessThan(amount)) {
        errors.amount = t('stake.validation.balance-exceed');
      }

      return errors;
    },
    [balance],
  );

  const max = useMemo(
    () =>
      floor(
        balance && balance.isGreaterThan(MAX_AMOUNT)
          ? balance.toNumber()
          : MAX_AMOUNT,
        stakingAmountStep,
      ),
    [balance, stakingAmountStep],
  );

  const INIT_AMOUNT =
    balance && balance.isGreaterThan(minAmount)
      ? floor(balance.toNumber(), stakingAmountStep)
      : minAmount;

  const renderForm = ({
    handleSubmit,
    values: { amount },
  }: FormRenderProps<any>) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className={classes.body}>
          <div className={classes.wrapper}>
            <Headline2 classes={{ root: classes.title }}>
              {t('stake.title')}
            </Headline2>

            <label className={classes.range}>
              <Headline2 component="p" classes={{ root: classes.label }}>
                {t('stake.i-want')}

                <span className={classes.amount}>
                  {renderValue(new BigNumber(amount))}
                </span>
              </Headline2>

              <Field
                component={SliderField}
                min={minAmount}
                max={max}
                step={stakingAmountStep}
                name="amount"
              />
            </label>

            {renderStats ? renderStats(amount) : null}
          </div>
        </div>

        <div className={classes.footer}>
          <div className={classNames(classes.wrapper, classes.footerWrapper)}>
            <Body2 className={classes.info} color="secondary" component="p">
              {t('stake.info')}
            </Body2>

            <MutationErrorHandler type={UserActionTypes.STAKE} />

            <Button
              color="primary"
              size="large"
              className={classes.submit}
              type="submit"
              disabled={loading}
            >
              {t('stake.stake')}
            </Button>
          </div>
        </div>
      </form>
    );
  };

  return (
    <section className={classes.root}>
      <Curtains classes={{ root: classes.container }}>
        <Paper className={classes.box} variant="outlined" square={false}>
          <Form
            onSubmit={onSubmit}
            render={renderForm}
            initialValues={{ amount: INIT_AMOUNT }}
            validate={validateStakeForm}
          />

          <IconButton
            disableTouchRipple={false}
            focusRipple={false}
            disableFocusRipple={false}
            disableRipple={false}
            className={classes.cancel}
            onClick={onCancel}
          >
            <Hidden smUp>
              <CloseIcon size="sm" />
            </Hidden>

            <Hidden xsDown>
              <CancelIcon size="xmd" />
            </Hidden>
          </IconButton>
        </Paper>
      </Curtains>
    </section>
  );
};
