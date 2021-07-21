import React, { useCallback, useState } from 'react';
import { Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { Field, Form, FormRenderProps } from 'react-final-form';

import { useSupportProjectFormStyles } from './SupportProjectFormStyles';
import { FormPayload } from '../../SupportProject';
import { t } from '../../../../../../common/utils/intl';
import { InputField } from '../../../../../../UiKit/InputField';
import { InfoLine } from '../InfoLine/InfoLine';
import { CheckboxField } from '../../../../../../UiKit/Checkbox/CheckboxField';
import { Body1 } from '../../../../../../UiKit/Typography';
import { Button } from '../../../../../../UiKit/Button';
import { FormErrors } from '../../../../../../common/types/FormErrors';
import {
  usePolkadotBalance,
  useSlotAuctionSdk,
} from '../../../../hooks/useSlotAuctionSdk';
import { INDEX_PATH } from '../../../../../../common/const';
import { QueryLoading } from '../../../../../../components/QueryLoading/QueryLoading';
import { historyInstance } from '../../../../../../common/utils/historyInstance';
import { ICrowdloanType } from '@ankr.com/stakefi-polkadot';

export const SupportProjectForm = ({
  crowdloan,
}: {
  crowdloan: ICrowdloanType;
}) => {
  const classes = useSupportProjectFormStyles();
  const [isLoading, setIsLoading] = useState(false);
  const dailyReward = 'N/A';
  const initialReward = 'N/A';

  const { slotAuctionSdk, polkadotAccount, isConnected } = useSlotAuctionSdk();
  const { balance, symbol } = usePolkadotBalance();
  console.log(`isConnected: ${isConnected}`);
  console.log(`balance: ${balance} ${symbol}`);

  const handleSubmit = async (payload: FormPayload) => {
    setIsLoading(true);
    try {
      await slotAuctionSdk.depositFundsToCrowdloan(
        polkadotAccount,
        crowdloan.loanId,
        new BigNumber(`${payload.contributeValue}`),
      );
    } catch (e) {
      console.error(`Failed to lend funds: ${e}`);
    } finally {
      setIsLoading(false);
      historyInstance.replace(INDEX_PATH);
    }
  };

  const validate = useCallback(
    ({ agreement, contributeValue }: FormPayload) => {
      const errors: FormErrors<FormPayload> = {};

      if (!contributeValue) {
        errors.contributeValue = t('validation.required');
      } else {
        const value = Number(contributeValue);
        if (isNaN(value)) {
          errors.contributeValue = t('validation.numberOnly');
        } else if (value <= 0) {
          errors.contributeValue = t('validation.min', { value: 0 });
        } /*else if (value > balance) {
          errors.contributeValue = t('validation.max', { value: balance }); // TODO: "this is not true"
        }*/
      }

      if (!agreement) {
        errors.agreement = t('validation.required');
      }

      return errors;
    },
    [],
  );

  const validateNumber = useCallback((value: string) => {
    if (!value) return undefined;
    const result = Number(value);
    if (isNaN(result)) {
      return t('validation.numberOnly');
    }
  }, []);

  const renderForm = ({
    handleSubmit,
    values,
  }: FormRenderProps<FormPayload>) => (
    <>
      <div className={classes.line}>
        <Typography variant="h2">
          {t('polkadot-slot-auction.supportProject.wantContribute')}
        </Typography>
        <div className={classes.inputContainer}>
          <Field
            classes={{ root: classes.input }}
            component={InputField}
            name="contributeValue"
            label={t(`polkadot-slot-auction.currency.${symbol}`)}
            variant="outlined"
            type="number"
            validate={validateNumber}
          />
          <div className={classes.balance}>
            {t('polkadot-slot-auction.supportProject.balance', {
              value: balance,
              symbol: t(`polkadot-slot-auction.currency.${symbol}`),
            })}
          </div>
        </div>
      </div>

      <InfoLine
        title={t('polkadot-slot-auction.supportProject.willGet')}
        value={values.contributeValue ?? 0}
      />
      <InfoLine
        title={t('polkadot-slot-auction.supportProject.initialReward')}
        value={initialReward}
      />
      <InfoLine
        title={t('polkadot-slot-auction.supportProject.dailyReward')}
        value={dailyReward}
      />
      <div className={classes.footer}>
        <div className={classes.disclaimerInput}>
          <Field component={CheckboxField} name="agreement" type="checkbox">
            <Body1
              variant="body1"
              color="secondary"
              className={classes.disclaimerText}
            >
              {t('polkadot-slot-auction.supportProject.disclaimer')}
            </Body1>
          </Field>
        </div>
        <div className={classes.buttonContainer}>
          <Button
            className={classes.button}
            onClick={handleSubmit}
            color="primary"
            size="large"
            type="submit"
            disabled={!values.agreement || !values.contributeValue || isLoading}
          >
            {t('polkadot-slot-auction.supportProject.contribute')}
          </Button>
          {isLoading && <QueryLoading />}
        </div>
      </div>
    </>
  );

  return (
    <Form
      onSubmit={handleSubmit}
      render={renderForm}
      validate={validate}
      initialValues={{ agreement: false }}
    />
  );
};
