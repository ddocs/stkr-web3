import { IconButton } from '@material-ui/core';
import React, { ReactNode, useCallback, useMemo } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { FormErrors } from '../../../../common/types/FormErrors';
import { floor } from '../../../../common/utils/floor';
import { t } from '../../../../common/utils/intl';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { UserActionTypes } from '../../../../store/actions/UserActions';
import { Button } from '../../../../UiKit/Button';
import { CheckboxField } from '../../../../UiKit/Checkbox/CheckboxField';
import { Curtains } from '../../../../UiKit/Curtains';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { SliderField } from '../../../../UiKit/RangeField';
import { Body1, Headline2 } from '../../../../UiKit/Typography';
import { useStakeFormStyles } from './StakeFormStyles';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import BigNumber from 'bignumber.js';

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
  agreementElement?: ReactNode;
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
  agreementElement,
}: IStakeFormComponentProps) => {
  const classes = useStakeFormStyles();

  const validateStakeForm = useCallback(
    ({ amount, agreement }: IStakePayload) => {
      const errors: FormErrors<IStakePayload> = {};

      if (!amount) {
        errors.amount = t('validation.required');
      } else if (balance?.isLessThan(amount)) {
        errors.amount = t('stake.validation.balance-exceed');
      }

      if (!agreement) {
        errors.agreement = t('stake.validation.agreement');
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
      <form onSubmit={handleSubmit} className={classes.form}>
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
        <div className={classes.footer}>
          <Field
            component={CheckboxField}
            name="agreement"
            classes={{ root: classes.checkbox }}
            type="checkbox"
            showErrorText={true}
          >
            <Body1
              classes={{ root: classes.checkboxLabel }}
              variant="body1"
              color="secondary"
              component="p"
            >
              {agreementElement}
            </Body1>
          </Field>
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
      </form>
    );
  };

  return (
    <section className={classes.component}>
      <Curtains classes={{ root: classes.wrapper }}>
        <BackgroundColorProvider className={classes.content} square={false}>
          <Headline2 classes={{ root: classes.title }}>
            {t('stake.title')}
          </Headline2>
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
            <CancelIcon size="md" />
          </IconButton>
        </BackgroundColorProvider>
      </Curtains>
    </section>
  );
};
