import React, { ChangeEvent, useCallback, useMemo } from 'react';
import { useTopUpStyles } from './TopUpStyles';
import { Form } from 'react-final-form';
import {
  MAX_PROVIDER_STAKING_AMOUNT,
  PROVIDER_NODE_LIST_PATH,
  PROVIDER_TOP_UP_ROUTE,
  PROVIDE_MIN_BALANCE,
  STAKING_AMOUNT_STEP,
} from '../../../../common/const';
import { FormErrors } from '../../../../common/types/FormErrors';
import { t } from '../../../../common/utils/intl';
import BigNumber from 'bignumber.js';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { useQuery } from '@redux-requests/react';
import { generatePath, useHistory, useParams } from 'react-router';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { IUserInfo } from '../../../../store/apiMappers/userApi';
import { IAllowance } from '../../../../store/apiMappers/allowance';
import { floor } from '../../../../common/utils/floor';
import { Headline2 } from '../../../../UiKit/Typography';
import { Box, IconButton, Paper, Tab, Tabs } from '@material-ui/core';
import { TopUpAnkrForm } from './TopUpAnkrForm';
import { TopUpEthForm } from './TopUpEthForm';
import { DepositType } from '../../../../common/types';
import { success } from '@redux-requests/core';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { IProviderStats } from '../../../../store/apiMappers/providerStatsApi';

enum TopUpCurreny {
  ankr = 'ankr',
  eth = 'eth',
}

export const DEPOSIT_TYPE_FIELD_NAME = 'depositType';
export const ETH_AMOUNT_FIELD_NAME = 'etheriumAmount';
export const ANKR_AMOUNT_FIELD_NAME = 'ankrAmount';

interface ITopUpPayload {
  [DEPOSIT_TYPE_FIELD_NAME]: DepositType;
  [ETH_AMOUNT_FIELD_NAME]: number;
  [ANKR_AMOUNT_FIELD_NAME]: number;
}

interface ITopUpProps {
  onSubmit(x: ITopUpPayload): void;
  ankrBalance?: BigNumber;
  ethereumBalance?: BigNumber;
  deposited?: BigNumber;
  currency: TopUpCurreny;
}

export const TopUpComponent = ({
  onSubmit,
  ankrBalance,
  ethereumBalance,
  currency,
  deposited,
}: ITopUpProps) => {
  const maxStakingAmount = useMemo(
    () =>
      ethereumBalance?.isGreaterThan(MAX_PROVIDER_STAKING_AMOUNT)
        ? MAX_PROVIDER_STAKING_AMOUNT
        : floor(ethereumBalance?.toNumber() ?? 0, 0.5),
    [ethereumBalance],
  );

  const minStakingAmount = useMemo(
    () => (deposited?.gt(0) ? STAKING_AMOUNT_STEP : PROVIDE_MIN_BALANCE),
    [deposited],
  );

  const INIT_VALUES = useMemo(
    () => ({
      [DEPOSIT_TYPE_FIELD_NAME]: DepositType.ETH,
      [ETH_AMOUNT_FIELD_NAME]: maxStakingAmount,
    }),
    [maxStakingAmount],
  );

  const render = useCallback(
    formProps =>
      currency === TopUpCurreny.ankr ? (
        <TopUpAnkrForm ankrBalance={ankrBalance} {...formProps} />
      ) : (
        <TopUpEthForm deposited={deposited} {...formProps} />
      ),
    [ankrBalance, currency, deposited],
  );

  const validateTopUpForm = useCallback(
    ({ ...data }: ITopUpPayload) => {
      const errors: FormErrors<ITopUpPayload> = {};

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
    <Box
      px={{ xs: 3, sm: 6 }}
      pb={{ xs: 3, sm: 7.5 }}
      pt={{ xs: 3, sm: 4.5 }}
    >
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

export const TopUp = () => {
  const classes = useTopUpStyles();
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
    (payload: ITopUpPayload) => {
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
            UserActions.topUp(allowanceData.totalAllowance, DepositType.ANKR),
          ).then(data => {
            if (data.action.type === success(UserActionTypes.TOP_UP)) {
              history.push(PROVIDER_NODE_LIST_PATH);
            }
          });
        }
      }
      // TODO Handle exception
    },
    [allowanceData, dispatch, history],
  );

  const handleCancel = useCallback(() => {
    history.goBack();
  }, [history]);

  const { type = TopUpCurreny.eth } = useParams() as { type: TopUpCurreny };
  const { push } = useHistory();
  const handleChange = useCallback(
    (event: ChangeEvent<Record<string, unknown>>, value: TopUpCurreny) => {
      push(generatePath(PROVIDER_TOP_UP_ROUTE, { type: value }));
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
        <TopUpComponent
          onSubmit={handleSubmit}
          ankrBalance={accountData?.ankrBalance}
          ethereumBalance={accountData?.ethereumBalance}
          deposited={providerStats?.balance}
          currency={type}
        />
      </Paper>
    </>
  );
};
