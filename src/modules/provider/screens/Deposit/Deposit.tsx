import { Box, IconButton, Paper, Tab, Tabs } from '@material-ui/core';
import { success } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import React, { ChangeEvent, useCallback, useMemo } from 'react';
import { Form } from 'react-final-form';
import { generatePath, useHistory, useParams } from 'react-router';
import {
  MAX_PROVIDER_STAKING_AMOUNT,
  PROVIDE_MIN_BALANCE,
  PROVIDER_DEPOSIT_LIST_PATH,
  PROVIDER_DEPOSIT_ROUTE,
  PROVIDER_NODE_LIST_PATH,
} from '../../../../common/const';
import { DepositType } from '../../../../common/types';
import { FormErrors } from '../../../../common/types/FormErrors';
import { floor } from '../../../../common/utils/floor';
import { t } from '../../../../common/utils/intl';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { IAllowance } from '../../../../store/apiMappers/allowance';
import { IProviderStats } from '../../../../store/apiMappers/providerStatsApi';
import { IUserInfo } from '../../../../store/apiMappers/userApi';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { Headline2 } from '../../../../UiKit/Typography';
import { DepositAnkrForm, MIN_NODE_DEPOSIT } from './DepositAnkrForm';
import { DepositEthForm } from './DepositEthForm';
import { useDepositStyles } from './DepositStyles';
import { useFeaturesAvailable } from '../../../../common/hooks/useFeaturesAvailable';

enum TopUpCurreny {
  ankr = 'ankr',
  eth = 'eth',
}

export const DEPOSIT_TYPE_FIELD_NAME = 'depositType';
export const ETH_AMOUNT_FIELD_NAME = 'etheriumAmount';
export const ANKR_AMOUNT_FIELD_NAME = 'ankrAmount';

interface IDepositPayload {
  [DEPOSIT_TYPE_FIELD_NAME]: DepositType;
  [ETH_AMOUNT_FIELD_NAME]: number;
  [ANKR_AMOUNT_FIELD_NAME]: number;
}

interface IDepositProps {
  onSubmit(x: IDepositPayload): void;
  ankrBalance?: BigNumber;
  ethereumBalance?: BigNumber;
  depositedEth?: BigNumber;
  depositedAnkrBalance?: BigNumber;
  currency: TopUpCurreny;
}

export const DepositComponent = ({
  onSubmit,
  ankrBalance,
  ethereumBalance,
  depositedEth,
  depositedAnkrBalance,
  currency,
}: IDepositProps) => {
  const { stakingAmountStep } = useFeaturesAvailable();

  const maxStakingAmount = useMemo(
    () =>
      ethereumBalance?.isGreaterThan(MAX_PROVIDER_STAKING_AMOUNT)
        ? MAX_PROVIDER_STAKING_AMOUNT
        : floor(ethereumBalance?.toNumber() ?? 0, 0.5),
    [ethereumBalance],
  );

  const minStakingAmount = useMemo(
    () => (depositedEth?.gt(0) ? stakingAmountStep : PROVIDE_MIN_BALANCE),
    [depositedEth, stakingAmountStep],
  );

  const INIT_VALUES = useMemo(
    () => ({
      [DEPOSIT_TYPE_FIELD_NAME]:
        currency === TopUpCurreny.ankr ? DepositType.ANKR : DepositType.ETH,
      [ETH_AMOUNT_FIELD_NAME]: maxStakingAmount,
    }),
    [maxStakingAmount, currency],
  );

  const render = useCallback(
    formProps =>
      currency === TopUpCurreny.ankr ? (
        <DepositAnkrForm
          ankrBalance={ankrBalance}
          depositedAnkrBalance={depositedAnkrBalance}
          {...formProps}
        />
      ) : (
        <DepositEthForm deposited={depositedEth} {...formProps} />
      ),
    [ankrBalance, currency, depositedEth, depositedAnkrBalance],
  );

  const validateTopUpForm = useCallback(
    ({ ...data }: IDepositPayload) => {
      const errors: FormErrors<IDepositPayload> = {};

      if (data[DEPOSIT_TYPE_FIELD_NAME] === DepositType.ETH) {
        if (data[ETH_AMOUNT_FIELD_NAME] < minStakingAmount) {
          errors[ETH_AMOUNT_FIELD_NAME] = t('validation.min-ETH-amount', {
            value: minStakingAmount,
          });
        }
      }

      return errors;
    },
    [minStakingAmount],
  );

  return (
    <Box px={{ xs: 3, sm: 6 }} pb={{ xs: 3, sm: 7.5 }} pt={{ xs: 3, sm: 4.5 }}>
      <Form
        render={render}
        onSubmit={onSubmit}
        validate={validateTopUpForm}
        initialValues={INIT_VALUES}
        initialValuesEqual={(a, b) => {
          return (
            a?.[DEPOSIT_TYPE_FIELD_NAME] === b?.[DEPOSIT_TYPE_FIELD_NAME] &&
            a?.[ETH_AMOUNT_FIELD_NAME] === b?.[ETH_AMOUNT_FIELD_NAME]
          );
        }}
      />
    </Box>
  );
};

export const Deposit = () => {
  const classes = useDepositStyles();
  const history = useHistory();
  const dispatch = useRequestDispatch();
  const { data: allowanceData } = useQuery<IAllowance | null>({
    type: UserActionTypes.FETCH_ALLOWANCE,
  });

  const { data: accountData } = useQuery<IUserInfo | null>({
    type: UserActionTypes.FETCH_ACCOUNT_DATA,
  });

  const { data: providerStats } = useQuery<IProviderStats | null>({
    type: UserActionTypes.FETCH_PROVIDER_STATS,
  });

  const handleSubmit = useCallback(
    (payload: IDepositPayload) => {
      if (payload[DEPOSIT_TYPE_FIELD_NAME] === DepositType.ETH) {
        dispatch(
          UserActions.topUp(
            new BigNumber(payload[ETH_AMOUNT_FIELD_NAME]),
            DepositType.ETH,
          ),
        ).then(data => {
          if (data.action.type === success(UserActionTypes.TOP_UP)) {
            history.push(PROVIDER_NODE_LIST_PATH);
          }
        });
      } else {
        if (allowanceData) {
          dispatch(
            UserActions.topUp(
              allowanceData.totalAllowance,
              DepositType.ANKR,
              providerStats?.depositedAnkrBalance.isGreaterThanOrEqualTo(
                MIN_NODE_DEPOSIT,
              ),
            ),
          ).then(data => {
            if (data.action.type === success(UserActionTypes.TOP_UP)) {
              history.push(PROVIDER_NODE_LIST_PATH);
            }
          });
        }
      }
      // TODO Handle exception
    },
    [allowanceData, dispatch, history, providerStats?.depositedAnkrBalance],
  );

  const handleCancel = useCallback(() => {
    history.push(PROVIDER_DEPOSIT_LIST_PATH);
  }, [history]);

  const { type = TopUpCurreny.eth } = useParams() as { type: TopUpCurreny };
  const { push } = useHistory();

  const handleChange = useCallback(
    (event: ChangeEvent<Record<string, unknown>>, value: TopUpCurreny) => {
      push(generatePath(PROVIDER_DEPOSIT_ROUTE, { type: value }));
    },
    [push],
  );

  return (
    <>
      <MutationErrorHandler type={UserActionTypes.TOP_UP} />
      <Headline2 align="center" className={classes.title}>
        {t('top-up.title')}
        <IconButton className={classes.cancel}>
          <CancelIcon onClick={handleCancel} />
        </IconButton>
      </Headline2>
      <Paper variant="outlined" square={false} className={classes.paper}>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          classes={{
            root: classes.tabs,
            flexContainer: classes.tabsFlexContainer,
          }}
        >
          <Tab
            label={t('top-up.tab.ankr')}
            value={TopUpCurreny.ankr}
            className={classes.tab}
          />
          <Tab label={t('top-up.tab.eth')} value={TopUpCurreny.eth} />
        </Tabs>
        <DepositComponent
          onSubmit={handleSubmit}
          ankrBalance={accountData?.ankrBalance}
          ethereumBalance={accountData?.ethereumBalance}
          depositedEth={providerStats?.ethBalance}
          depositedAnkrBalance={providerStats?.depositedAnkrBalance}
          currency={type}
        />
      </Paper>
    </>
  );
};
