import React, { useCallback } from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { useStakeStyles } from './StakeStyles';
import {
  Body1,
  Body2,
  Headline2,
  Headline3,
  Headline5,
} from '../../../../UiKit/Typography';
import { t } from '../../../../common/utils/intl';
import { IconButton, Tooltip, Typography } from '@material-ui/core';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { QuestionIcon } from '../../../../UiKit/Icons/QuestionIcon';
import { SliderField } from '../../../../UiKit/RangeField';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { FormErrors } from '../../../../common/types/FormErrors';
import { Mutation, useQuery } from '@redux-requests/react';
import { IUserInfo } from '../../../../store/apiMappers/userApi';
import BigNumber from 'bignumber.js';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import { useHistory } from 'react-router';
import { STAKER_DASHBOAR_PATH, YEAR_INTEREST } from '../../../../common/const';
import { success } from '@redux-requests/core';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { CheckboxField } from '../../../../UiKit/Checkbox/CheckboxField';
import { Button } from '../../../../UiKit/Button';
import { useIsXSDown } from '../../../../common/hooks/useTheme';

const MIN_AMOUNT = 0.5;
const MAX_AMOUNT = 32;
const INIT_AMOUNT = 10;
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

  const isXSDown = useIsXSDown();

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
              {t('units.eth', { value: amount })}
            </span>
          </Headline2>
          <Field
            component={SliderField}
            min={MIN_AMOUNT}
            max={MAX_AMOUNT}
            step={0.5}
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
            {t('units.~months', { value: INTEREST_PERIOD })}
          </Headline5>
          <dt className={classes.term}>
            <Typography component="span">
              {t('stake.yearly-earning')}
              <Tooltip title={t('stake.yearly-earning-tooltip')}>
                <IconButton className={classes.question}>
                  <QuestionIcon size="xs" />
                </IconButton>
              </Tooltip>
            </Typography>
            <Body2 classes={{ root: classes.note }} color="textSecondary">
              {t('stake.yearly-earning-tip')}
            </Body2>
          </dt>
          <Headline3 component="dd" classes={{ root: classes.description }}>
            {t('units.~eth', {
              value: new BigNumber(amount * yearlyInterest).toFormat(
                FIXED_DECIMAL_PLACES,
              ),
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
        <BackgroundColorProvider className={classes.content}>
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
            <CancelIcon size={isXSDown ? 'xs' : 'md'} />
          </IconButton>
        </BackgroundColorProvider>
      </Curtains>
    </section>
  );
};

export const Stake = () => {
  const dispatch = useRequestDispatch();
  const { replace, goBack } = useHistory();

  const handleSubmit = ({ amount }: IStakePayload) => {
    dispatch(UserActions.stake(amount.toString(10))).then(data => {
      if (data.action.type === success(UserActionTypes.STAKE)) {
        replace(STAKER_DASHBOAR_PATH);
      }
    });
  };

  const { data } = useQuery<IUserInfo | null>({
    type: UserActionTypes.FETCH_ACCOUNT_DATA,
  });

  const handleCancel = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <StakeComponent
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      ethereumBalance={data?.ethereumBalance}
      yearlyInterest={YEAR_INTEREST}
    />
  );
};
