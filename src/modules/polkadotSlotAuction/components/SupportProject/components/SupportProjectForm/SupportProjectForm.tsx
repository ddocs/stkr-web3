import React, { useCallback } from 'react';
import { Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';
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
import { useSlotAuctionSdk } from '../../../../hooks/useSlotAuctionSdk';

export const SupportProjectForm = () => {
  const classes = useSupportProjectFormStyles();
  const balance = 47;
  const dailyReward = 1.25;
  const initialReward = 825.25;

  const { id } = useParams<{ id: string; name: string }>();
  const { slotAuctionSdk, polkadotAccount } = useSlotAuctionSdk();

  const handleSubmit = async (payload: FormPayload) => {
    console.log(payload);
    await slotAuctionSdk.depositFundsToCrowdloan(
      polkadotAccount,
      Number.parseInt(id),
      new BigNumber(`${payload.contributeValue}`),
    );
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
        } else if (value > balance) {
          errors.contributeValue = t('validation.max', { value: balance });
        }
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
            label={t('polkadot-slot-auction.dot')}
            variant="outlined"
            type="number"
            validate={validateNumber}
          />
          <div className={classes.balance}>
            {t('polkadot-slot-auction.supportProject.balance', {
              value: balance,
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
        <Button
          className={classes.button}
          onClick={handleSubmit}
          color="primary"
          size="large"
          type="submit"
          disabled={!values.agreement || !values.contributeValue}
        >
          {t('polkadot-slot-auction.supportProject.contribute')}
        </Button>
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
