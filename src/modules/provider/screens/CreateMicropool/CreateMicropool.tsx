import React, { useCallback, useMemo } from 'react';
import { useCreateMicropoolStyles } from './CreateMicropoolStyles';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { Form } from 'react-final-form';
import {
  CreateMicropoolForm,
  DEPOSIT_TYPE_FIELD_NAME,
  DepositType,
  ETH_AMOUNT_FIELD_NAME,
  MIN_ETH_AMOUNT_DEPOSIT,
} from './CreateMicropoolForm';
import { IconButton } from '@material-ui/core';
import { MAX_PROVIDER_STAKING_AMOUNT } from '../../../../common/const';
import { isAlphanumeric } from '../../../../common/utils/isAlphanumeric';
import { FormErrors } from '../../../../common/types/FormErrors';
import { t } from '../../../../common/utils/intl';
import BigNumber from 'bignumber.js';

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
    formProps => (
      <CreateMicropoolForm ankrBalance={ankrBalance} {...formProps} />
    ),
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
        validate={validateCreateMicropoolForm}
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

export const CreateMicropoolImp = () => {
  return <></>;
};
