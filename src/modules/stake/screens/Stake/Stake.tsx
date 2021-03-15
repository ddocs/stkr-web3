import {
  Hidden,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { success } from '@redux-requests/core';
import { Mutation, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { useHistory } from 'react-router';
import { STAKER_DASHBOARD_PATH, STAKER_RATE } from '../../../../common/const';
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
import { IGlobalStats } from '../../../../store/apiMappers/globalStatsApi';
import { IUserInfo } from '../../../../store/apiMappers/userApi';
import { Button } from '../../../../UiKit/Button';
import { Curtains } from '../../../../UiKit/Curtains';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { CloseIcon } from '../../../../UiKit/Icons/CloseIcon';
import { QuestionIcon } from '../../../../UiKit/Icons/QuestionIcon';
import { SliderField } from '../../../../UiKit/RangeField';
import { Body2, Headline2, Headline5 } from '../../../../UiKit/Typography';
import { useStakeStyles } from './StakeStyles';

const MAX_AMOUNT = 32;
const FIXED_DECIMAL_PLACES = 2;

interface IStakePayload {
  amount: number;
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

  const { stakingAmountStep, stakingFeeRate } = useFeaturesAvailable();

  const validateStakeForm = useCallback(
    ({ amount }: IStakePayload) => {
      const errors: FormErrors<IStakePayload> = {};

      if (!amount) {
        errors.amount = t('validation.required');
      } else if (ethereumBalance?.isLessThan(amount)) {
        errors.amount = t('stake.validation.balance-exceed');
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
              {stakingFeeRate && !stakingFeeRate.isZero() && (
                <>
                  <Typography classes={{ root: classes.term }} component="dt">
                    {t('stake.operation-fee')}

                    <Tooltip title={t('stake.operation-fee-tooltip')}>
                      <IconButton className={classes.question}>
                        <QuestionIcon size="xs" />
                      </IconButton>
                    </Tooltip>
                  </Typography>

                  <Headline5
                    component="dd"
                    classes={{ root: classes.description }}
                  >
                    ~
                    {stakingFeeRate
                      .multipliedBy(amount / MAX_AMOUNT)
                      .toNumber()
                      .toFixed(6)}
                    &nbsp;ETH
                  </Headline5>
                </>
              )}

              {yearlyInterest > 0 && (
                <>
                  <Body2 className={classes.term} component="dt">
                    {t('stake.yearly-earning')}

                    <Tooltip title={tHTML('stake.yearly-earning-tooltip')}>
                      <IconButton className={classes.question}>
                        <QuestionIcon size="xs" />
                      </IconButton>
                    </Tooltip>
                  </Body2>

                  <Headline5
                    component="dd"
                    classes={{ root: classes.description }}
                  >
                    {t('unit.~eth-value', {
                      value: new BigNumber(amount)
                        .multipliedBy(yearlyInterest)
                        .decimalPlaces(FIXED_DECIMAL_PLACES),
                    })}
                  </Headline5>
                </>
              )}
            </dl>
          </div>
        </div>

        <div className={classes.footer}>
          <div className={classNames(classes.wrapper, classes.footerWrapper)}>
            <Body2 className={classes.info} color="secondary" component="p">
              {t('stake.info')}
            </Body2>

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

  const { data: userInfo } = useQuery<IUserInfo | null>({
    type: UserActionTypes.FETCH_ACCOUNT_DATA,
  });

  const { data: globalStats } = useQuery<IGlobalStats | null>({
    type: UserActionTypes.FETCH_GLOBAL_STATS,
  });

  const handleCancel = useCallback(() => {
    push(STAKER_DASHBOARD_PATH);
  }, [push]);

  const yearlyInterest =
    globalStats && globalStats.currentApr
      ? globalStats.currentApr * STAKER_RATE
      : 0;

  return (
    <StakeComponent
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      ethereumBalance={userInfo?.ethereumBalance}
      yearlyInterest={yearlyInterest}
    />
  );
};
