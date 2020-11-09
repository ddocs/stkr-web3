import React, { useCallback } from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { useStakeStyles } from './StakeStyles';
import {
  Body2,
  Headline2,
  Headline3,
  Headline5,
} from '../../../../UiKit/Typography';
import { t } from '../../../../common/utils/intl';
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
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

const MIN_AMOUNT = 0.5;
const MAX_AMOUNT = 32;
const INIT_AMOUNT = 10;
const INTEREST_PERIOD = 12;
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

  const renderForm = ({
    handleSubmit,
    values: { amount },
    errors,
    invalid,
  }: FormRenderProps<any>) => {
    return (
      <form onSubmit={handleSubmit} className={classes.form}>
        <BackgroundColorProvider className={classes.content}>
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
          <Headline2 align="center" className={classes.header}>
            {t('stake.title')}
          </Headline2>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Headline2>{t('stake.i-want')}</Headline2>
            <Headline2>{t('units.eth', { value: amount })}</Headline2>
          </Box>
          <Box mb={2}>
            <Field
              component={SliderField}
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              step={0.5}
              name="amount"
            />
            {errors.amount && (
              <FormHelperText error={true} className={classes.amountError}>
                {errors.amount}
              </FormHelperText>
            )}
          </Box>

          <Box mb={6} display="flex" justifyContent="space-between">
            <Typography className={classes.label}>
              {t('stake.staking-period')}
              <Tooltip title={t('stake.staking-period-tooltip')}>
                <IconButton className={classes.question}>
                  <QuestionIcon size="xs" />
                </IconButton>
              </Tooltip>
            </Typography>
            <Headline5>
              {t('units.~months', { value: INTEREST_PERIOD })}
            </Headline5>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
            mb={1}
          >
            <Typography>
              {t('stake.yearly-earning')}
              <Tooltip title={t('stake.yearly-earning-tooltip')}>
                <IconButton className={classes.question}>
                  <QuestionIcon size="xs" />
                </IconButton>
              </Tooltip>
            </Typography>
            <Headline3>
              {t('units.~eth', {
                value: new BigNumber(amount * yearlyInterest).toFormat(
                  FIXED_DECIMAL_PLACES,
                ),
              })}
            </Headline3>
          </Box>
          <Box>
            <Body2 color="textSecondary">{t('stake.yearly-earning-tip')}</Body2>
          </Box>
        </BackgroundColorProvider>
        <Divider />
        <BackgroundColorProvider className={classes.footer}>
          <MutationErrorHandler type={UserActionTypes.STAKE} />
          <Mutation type={UserActionTypes.STAKE}>
            {({ loading }) => (
              <Button
                fullWidth={true}
                color="primary"
                size="large"
                className={classes.submit}
                type="submit"
                disabled={loading || invalid}
              >
                {t('stake.stake')}
              </Button>
            )}
          </Mutation>
        </BackgroundColorProvider>
      </form>
    );
  };

  return (
    <section className={classes.component}>
      <Curtains classes={{ root: classes.wrapper }}>
        <Form
          onSubmit={onSubmit}
          render={renderForm}
          initialValues={{ amount: INIT_AMOUNT }}
          validate={validateStakeForm}
        />
        <Typography color="textSecondary" className={classes.note}>
          {t('stake.note')}
        </Typography>
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
