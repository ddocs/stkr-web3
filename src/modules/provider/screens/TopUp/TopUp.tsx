import React, { useCallback, useMemo } from 'react';
import { useTopUpStyles } from './TopUpStyles';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { Form } from 'react-final-form';
import {
  ANKR_AMOUNT_FIELD_NAME,
  TopUpForm,
  DEPOSIT_TYPE_FIELD_NAME,
  DepositType,
  ETH_AMOUNT_FIELD_NAME,
  MIN_ETH_AMOUNT_DEPOSIT,
} from './TopUpForm';
import { IconButton } from '@material-ui/core';
import {
  MAX_PROVIDER_STAKING_AMOUNT,
  PROVIDER_NODES_PATH,
} from '../../../../common/const';
import { FormErrors } from '../../../../common/types/FormErrors';
import { t } from '../../../../common/utils/intl';
import BigNumber from 'bignumber.js';
import { Curtains } from '../../../../UiKit/Curtains';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { Mutation, useQuery } from '@redux-requests/react';
import { TopUpProgress } from './TopUpProgress';
import { useHistory } from 'react-router';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { IUserInfo } from '../../../../store/apiMappers/userApi';
import classNames from 'classnames';
import { IAllowance } from '../../../../store/apiMappers/allowance';

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
  onClose?(): void;
  ankrBalance?: BigNumber;
  ethereumBalance?: BigNumber;
}

export const TopUpComponent = ({
  onSubmit,
  onClose,
  ankrBalance,
  ethereumBalance,
}: ITopUpProps) => {
  const classes = useTopUpStyles();

  const maxStakingAmount = useMemo(
    () =>
      ethereumBalance?.isGreaterThan(MAX_PROVIDER_STAKING_AMOUNT)
        ? new BigNumber(MAX_PROVIDER_STAKING_AMOUNT)
        : ethereumBalance,
    [ethereumBalance],
  );

  const INIT_VALUES = useMemo(
    () => ({
      [DEPOSIT_TYPE_FIELD_NAME]: DepositType.ANKR,
      [ETH_AMOUNT_FIELD_NAME]: maxStakingAmount,
    }),
    [maxStakingAmount],
  );

  const render = useCallback(
    formProps => <TopUpForm ankrBalance={ankrBalance} {...formProps} />,
    [ankrBalance],
  );

  return (
    <div className={classes.component}>
      <IconButton className={classes.close} onClick={onClose}>
        <CancelIcon />
      </IconButton>
      <Form
        render={render}
        onSubmit={onSubmit}
        validate={validateTopUpForm}
        initialValues={INIT_VALUES}
        initialValuesEqual={(a, b) => {
          return (
            a?.[DEPOSIT_TYPE_FIELD_NAME] === b?.[DEPOSIT_TYPE_FIELD_NAME] &&
            a?.[ETH_AMOUNT_FIELD_NAME]?.isEqualTo(b?.[ETH_AMOUNT_FIELD_NAME])
          );
        }}
      />
    </div>
  );
};

export const TopUpImp = () => {
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
        ).then(() => history.push(PROVIDER_NODES_PATH));
      } else {
        if (allowanceData) {
          dispatch(
            UserActions.topUp(allowanceData.totalAllowance, DepositType.ANKR),
          ).then(() => history.push(PROVIDER_NODES_PATH));
        }
      }
      // TODO Handle exception
    },
    [allowanceData, dispatch, history],
  );

  const handleClose = useCallback(() => {
    history.goBack();
  }, [history]);

  const { data } = useQuery<IUserInfo | null>({
    type: UserActionTypes.FETCH_ACCOUNT_DATA,
  });

  return (
    <section className={classNames(classes.section)}>
      <Curtains classes={{ root: classes.wrapper }}>
        <BackgroundColorProvider className={classes.content}>
          <MutationErrorHandler type={UserActionTypes.TOP_UP} />
          <Mutation type={UserActionTypes.TOP_UP}>
            {({ loading }) =>
              loading ? (
                <TopUpProgress />
              ) : (
                <TopUpComponent
                  onSubmit={handleSubmit}
                  onClose={handleClose}
                  ankrBalance={data?.ankrBalance}
                  ethereumBalance={data?.ethereumBalance}
                />
              )
            }
          </Mutation>
        </BackgroundColorProvider>
      </Curtains>
    </section>
  );
};
