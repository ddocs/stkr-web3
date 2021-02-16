import { IconButton, Tooltip, Typography } from '@material-ui/core';
import { success } from '@redux-requests/core';
import { Mutation, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import React, { useCallback, useMemo } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { useHistory } from 'react-router';
import { STAKER_DASHBOARD_PATH, YEAR_INTEREST } from '../../../../common/const';
import { useFeaturesAvailable } from '../../../../common/hooks/useFeaturesAvailable';
import { FormErrors } from '../../../../common/types/FormErrors';
import { floor } from '../../../../common/utils/floor';
import { t, tHTML } from '../../../../common/utils/intl';
import { pushEvent } from '../../../../common/utils/pushEvent';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { IUserInfo } from '../../../../store/apiMappers/userApi';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { Button } from '../../../../UiKit/Button';
import { CheckboxField } from '../../../../UiKit/Checkbox/CheckboxField';
import { Curtains } from '../../../../UiKit/Curtains';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { QuestionIcon } from '../../../../UiKit/Icons/QuestionIcon';
import { SliderField } from '../../../../UiKit/RangeField';
import {
  Body1,
  Headline2,
  Headline3,
  Headline5,
} from '../../../../UiKit/Typography';
import { useStakeStyles } from './StakeStyles';

const MAX_AMOUNT = 32;
const INTEREST_PERIOD = 12;
const FIXED_DECIMAL_PLACES = 2;

interface IStakePayload {
  amount: number;
  agreement: boolean;
}

interface IStakeComponentProps {
  onSubmit: (payload: IStakePayload) => void;
  onCancel: () => void;
  ethereumBalance?: BigNumber;
  yearlyInterest: number;
}

export const StakeComponent = ({
  onSubmit,
  onCancel,
  ethereumBalance,
  yearlyInterest,
}: IStakeComponentProps) => {
  const classes = useStakeStyles();

  const { stakingAmountStep } = useFeaturesAvailable();

  const validateStakeForm = useCallback(
    ({ amount, agreement }: IStakePayload) => {
      const errors: FormErrors<IStakePayload> = {};

      if (!amount) {
        errors.amount = t('validation.required');
      } else if (ethereumBalance?.isLessThan(amount)) {
        errors.amount = t('stake.validation.balance-exceed');
      }

      if (!agreement) {
        errors.agreement = t('stake.validation.agreement');
      }

      return errors;
    },
    [ethereumBalance],
  );

  const max = useMemo(
    () =>
      floor(
        ethereumBalance && ethereumBalance.isGreaterThan(MAX_AMOUNT)
          ? ethereumBalance.toNumber()
          : MAX_AMOUNT,
        stakingAmountStep,
      ),
    [ethereumBalance, stakingAmountStep],
  );

  const INIT_AMOUNT =
    ethereumBalance && ethereumBalance.isGreaterThan(stakingAmountStep)
      ? floor(ethereumBalance.toNumber(), stakingAmountStep)
      : stakingAmountStep;

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
              {t('unit.eth-value', {
                value: new BigNumber(amount),
              })}
            </span>
          </Headline2>
          <Field
            component={SliderField}
            min={stakingAmountStep}
            max={max}
            step={stakingAmountStep}
            name="amount"
          />
        </label>

        <dl className={classes.list}>
          <Typography classes={{ root: classes.term }} component="dt">
            {t('stake.staking-period')}
            <Tooltip title={t('stake.staking-period-tooltip')}>
              <IconButton className={classes.question}>
                <QuestionIcon size="xs" />
              </IconButton>
            </Tooltip>
          </Typography>
          <Headline5 classes={{ root: classes.description }} component="dd">
            {t('unit.~months-value', { value: INTEREST_PERIOD })}
          </Headline5>
          <dt className={classes.term}>
            <Typography component="span">
              {t('stake.yearly-earning')}
              <Tooltip title={tHTML('stake.yearly-earning-tooltip')}>
                <IconButton className={classes.question}>
                  <QuestionIcon size="xs" />
                </IconButton>
              </Tooltip>
            </Typography>
          </dt>
          <Headline3 component="dd" classes={{ root: classes.description }}>
            {t('unit.~eth-value', {
              value: new BigNumber(amount)
                .multipliedBy(yearlyInterest)
                .decimalPlaces(FIXED_DECIMAL_PLACES),
            })}
          </Headline3>
        </dl>
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
              {t('stake.agreement')}
            </Body1>
          </Field>
          <MutationErrorHandler type={UserActionTypes.STAKE} />
          <Mutation type={UserActionTypes.STAKE}>
            {({ loading }) => (
              <Button
                color="primary"
                size="large"
                className={classes.submit}
                type="submit"
                disabled={loading}
              >
                {t('stake.stake')}
              </Button>
            )}
          </Mutation>
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

export const Stake = () => {
  const dispatch = useRequestDispatch();
  const { replace, push } = useHistory();

  const handleSubmit = ({ amount }: IStakePayload) => {
    dispatch(UserActions.stake(amount.toString(10))).then(data => {
      if (data.action.type === success(UserActionTypes.STAKE)) {
        replace(STAKER_DASHBOARD_PATH);
      }
    });

    pushEvent('stake_submit', { stakingAmount: amount });
  };

  const { data } = useQuery<IUserInfo | null>({
    type: UserActionTypes.FETCH_ACCOUNT_DATA,
  });

  const handleCancel = useCallback(() => {
    push(STAKER_DASHBOARD_PATH);
  }, [push]);

  return (
    <StakeComponent
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      ethereumBalance={data?.ethereumBalance}
      yearlyInterest={YEAR_INTEREST}
    />
  );
};
