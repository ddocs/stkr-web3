import React, { useCallback, useMemo } from 'react';
import { useCreateMicropoolStyles } from './CreateMicropoolStyles';
import classNames from 'classnames';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { Form } from 'react-final-form';
import {
  CreateMicropoolForm,
  DEPOSIT_TYPE_FIELD_NAME,
  DepositType,
  ETH_AMOUNT_FIELD_NAME,
  MIN_ETH_AMOUNT_DEPOSIT,
} from './CreateMicropoolForm';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { Mutation, useQuery } from '@redux-requests/react';
import { Curtains } from '../../../../UiKit/Curtains';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { CreateMicropoolProgress } from './CreateMicropoolProgress';
import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router';
import { IRequestActionPromiseData } from '../../../../common/types';
import { success } from '@redux-requests/core';
import { PROVIDER_MICROPOOL_LIST_PATH } from '../../../../common/const';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import { isAlphanumeric } from '../../../../common/utils/isAlphanumeric';
import { FormErrors } from '../../../../common/types/FormErrors';
import { t } from '../../../../common/utils/intl';
import { IUserInfo } from '../../../../store/apiMappers/userApi';
import BigNumber from 'bignumber.js';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';

const MICROPOOL_NAME_MAX_LENGTH = 32;

interface ICreateMicropoolPayload {
  name: string;
  [DEPOSIT_TYPE_FIELD_NAME]: DepositType;
  [ETH_AMOUNT_FIELD_NAME]: number;
}

function validateCreateMicropoolForm({
  name,
  ...data
}: ICreateMicropoolPayload) {
  const errors: FormErrors<ICreateMicropoolPayload> = {};

  if (!name) {
    errors.name = t('validation.required');
  } else if (!isAlphanumeric(name)) {
    errors.name = t('validation.alphanumeric');
  } else if (name.length > MICROPOOL_NAME_MAX_LENGTH) {
    errors.name = t('validation.min-length', {
      size: MICROPOOL_NAME_MAX_LENGTH,
    });
  }

  if (data[DEPOSIT_TYPE_FIELD_NAME] === DepositType.ETH) {
    if (data[ETH_AMOUNT_FIELD_NAME] < MIN_ETH_AMOUNT_DEPOSIT) {
      errors[ETH_AMOUNT_FIELD_NAME] = t('validation.min-ETH-amount', {
        value: MIN_ETH_AMOUNT_DEPOSIT,
      });
    }
  }

  return errors;
}

interface ICreateMicropoolProps {
  onSubmit(x: ICreateMicropoolPayload): void;
  onClose?(): void;
  ankrBalance?: BigNumber;
  ethereumBalance?: BigNumber;
}

export const CreateMicropoolComponent = ({
  onSubmit,
  onClose,
  ankrBalance,
  ethereumBalance,
}: ICreateMicropoolProps) => {
  const classes = useCreateMicropoolStyles();

  const INIT_VALUES = useMemo(
    () => ({
      [DEPOSIT_TYPE_FIELD_NAME]: DepositType.ANKR,
      [ETH_AMOUNT_FIELD_NAME]: ethereumBalance?.toFixed(),
    }),
    [ethereumBalance],
  );

  return (
    <div className={classes.component}>
      <IconButton className={classes.close} onClick={onClose}>
        <CancelIcon />
      </IconButton>
      <Form
        render={formProps => (
          <CreateMicropoolForm
            ankrBalance={ankrBalance}
            ethereumBalance={ethereumBalance}
            {...formProps}
          />
        )}
        onSubmit={onSubmit}
        validate={validateCreateMicropoolForm}
        initialValues={INIT_VALUES}
      />
    </div>
  );
};

export const CreateMicropoolImp = () => {
  const classes = useCreateMicropoolStyles();
  const history = useHistory();
  const dispatch = useRequestDispatch();

  const handleSubmit = useCallback(
    (payload: ICreateMicropoolPayload) => {
      if (payload[DEPOSIT_TYPE_FIELD_NAME] === DepositType.ETH) {
        dispatch(
          UserActions.allowEthTokens({
            name: payload.name,
            amount: new BigNumber(payload[ETH_AMOUNT_FIELD_NAME]),
          }),
        );
      }

      dispatch(UserActions.createMicropool(payload)).then(
        (data: IRequestActionPromiseData) => {
          if (data.action.type === success(UserActionTypes.CREATE_MICROPOOL)) {
            history.replace(PROVIDER_MICROPOOL_LIST_PATH);
          }
        },
      );
    },
    [dispatch, history],
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
          <MutationErrorHandler type={UserActionTypes.CREATE_MICROPOOL} />
          <Mutation type={UserActionTypes.CREATE_MICROPOOL}>
            {({ loading }) =>
              loading ? (
                <CreateMicropoolProgress />
              ) : (
                <CreateMicropoolComponent
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