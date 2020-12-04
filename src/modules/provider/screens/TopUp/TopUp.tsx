import React, { ChangeEvent, useCallback, useMemo } from 'react';
import { useTopUpStyles } from './TopUpStyles';
import { Form } from 'react-final-form';
import {
  MAX_PROVIDER_STAKING_AMOUNT,
  PROVIDER_NODES_PATH,
} from '../../../../common/const';
import { FormErrors } from '../../../../common/types/FormErrors';
import { t } from '../../../../common/utils/intl';
import BigNumber from 'bignumber.js';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { useQuery } from '@redux-requests/react';
import {
  generatePath,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { IUserInfo } from '../../../../store/apiMappers/userApi';
import { IAllowance } from '../../../../store/apiMappers/allowance';
import { floor } from '../../../../common/utils/floor';
import { Headline2 } from '../../../../UiKit/Typography';
import { Box, Paper, Tab, Tabs } from '@material-ui/core';
import { TopUpAnkrForm } from './TopUpAnkrForm';
import { TopUpEthForm } from './TopUpEthForm';
import { DepositType } from '../../../../common/types';
import { success } from '@redux-requests/core';

enum TopUpCurreny {
  ankr = 'ankr',
  eth = 'eth',
}

export const DEPOSIT_TYPE_FIELD_NAME = 'depositType';
export const ETH_AMOUNT_FIELD_NAME = 'etheriumAmount';
export const ANKR_AMOUNT_FIELD_NAME = 'ankrAmount';
export const MIN_ETH_AMOUNT_DEPOSIT = 2;

interface ITopUpPayload {
  [DEPOSIT_TYPE_FIELD_NAME]: DepositType;
  [ETH_AMOUNT_FIELD_NAME]: number;
  [ANKR_AMOUNT_FIELD_NAME]: number;
}

function validateTopUpForm({ ...data }: ITopUpPayload) {
  const errors: FormErrors<ITopUpPayload> = {};

  if (data[DEPOSIT_TYPE_FIELD_NAME] === DepositType.ETH) {
    if (data[ETH_AMOUNT_FIELD_NAME] < MIN_ETH_AMOUNT_DEPOSIT) {
      errors[ETH_AMOUNT_FIELD_NAME] = t('validation.min-ETH-amount', {
        value: MIN_ETH_AMOUNT_DEPOSIT,
      });
    }
  }

  return errors;
}

interface ITopUpProps {
  onSubmit(x: ITopUpPayload): void;
  ankrBalance?: BigNumber;
  ethereumBalance?: BigNumber;
  currency: TopUpCurreny;
}

export const TopUpComponent = ({
  onSubmit,
  ankrBalance,
  ethereumBalance,
  currency,
}: ITopUpProps) => {
  const maxStakingAmount = useMemo(
    () =>
      ethereumBalance?.isGreaterThan(MAX_PROVIDER_STAKING_AMOUNT)
        ? MAX_PROVIDER_STAKING_AMOUNT
        : floor(ethereumBalance?.toNumber() ?? 0, 0.5),
    [ethereumBalance],
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
        <TopUpEthForm {...formProps} />
      ),
    [ankrBalance, currency],
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

export const TopUpContainer = () => {
  const classes = useTopUpStyles();
  const history = useHistory();
  const dispatch = useRequestDispatch();
  const { data: allowanceData } = useQuery<IAllowance | null>({
    type: UserActionTypes.FETCH_ALLOWANCE,
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
            history.push(PROVIDER_NODES_PATH);
          }
        });
      } else {
        if (allowanceData) {
          dispatch(
            UserActions.topUp(allowanceData.totalAllowance, DepositType.ANKR),
          ).then(data => {
            if (data.action.type === success(UserActionTypes.TOP_UP)) {
              history.push(PROVIDER_NODES_PATH);
            }
          });
        }
      }
      // TODO Handle exception
    },
    [allowanceData, dispatch, history],
  );

  const { data } = useQuery<IUserInfo | null>({
    type: UserActionTypes.FETCH_ACCOUNT_DATA,
  });

  const { type = TopUpCurreny.eth } = useParams();
  const { push } = useHistory();
  const route = useRouteMatch();

  const handleChange = useCallback(
    (event: ChangeEvent<{}>, value: TopUpCurreny) => {
      push(generatePath(route.path, { type: value }));
    },
    [push, route.path],
  );

  return (
    <section>
      <MutationErrorHandler type={UserActionTypes.TOP_UP} />
      <Headline2 align="center" className={classes.title}>
        {t('top-up.title')}
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
            disabled={true}
          />
          <Tab label={t('top-up.tab.eth')} value={TopUpCurreny.eth} />
        </Tabs>
        <TopUpComponent
          onSubmit={handleSubmit}
          ankrBalance={data?.ankrBalance}
          ethereumBalance={data?.ethereumBalance}
          currency={type}
        />
      </Paper>
    </section>
  );
};
