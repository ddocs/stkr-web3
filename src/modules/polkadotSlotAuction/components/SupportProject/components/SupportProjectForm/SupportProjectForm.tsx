import React, { useCallback, useState } from 'react';
import { Typography } from '@material-ui/core';
import { Field, Form, FormRenderProps } from 'react-final-form';

import { useSupportProjectFormStyles } from './SupportProjectFormStyles';
import { FormPayload } from '../../SupportProject';
import { t } from '../../../../../../common/utils/intl';
import { InputField } from '../../../../../../UiKit/InputField';
import { InfoLine } from '../InfoLine/InfoLine';
import { CheckboxField } from '../../../../../../UiKit/Checkbox/CheckboxField';
import { Button } from '../../../../../../UiKit/Button';
import { FormErrors } from '../../../../../../common/types/FormErrors';
import { useSlotAuctionSdk } from '../../../../hooks/useSlotAuctionSdk';
import { QueryLoading } from '../../../../../../components/QueryLoading/QueryLoading';
import { ICrowdloanType } from '@ankr.com/stakefi-polkadot';
import { usePolkadotBalance } from '../../../../hooks/usePolkadotBalance';
import { useDispatch } from 'react-redux';
import { SlotAuctionActions } from '../../../../actions/SlotAuctionActions';

export const SupportProjectForm = ({
  crowdloan,
  goToParachainBondsCrowdloans,
}: {
  crowdloan: ICrowdloanType;
  goToParachainBondsCrowdloans: () => void;
}) => {
  const classes = useSupportProjectFormStyles();

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const { slotAuctionSdk, polkadotAccount } = useSlotAuctionSdk();
  const { balance, symbol: currency } = usePolkadotBalance();

  const initialReward = crowdloan.airdropRate.toString(10);
  const dailyReward = crowdloan.rewardRate.toString(10);

  const handleSubmit = async (payload: FormPayload) => {
    setIsLoading(true);

    await dispatch(
      SlotAuctionActions.depositFundsToCrowdloan(
        slotAuctionSdk,
        polkadotAccount,
        crowdloan.loanId,
        payload.contributeValue,
      ),
    );

    setIsLoading(false);
    goToParachainBondsCrowdloans();
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
        } else if (value > balance.toNumber()) {
          errors.contributeValue = t('validation.max', {
            value: balance.toNumber(),
          });
        }
      }

      if (!agreement) {
        errors.agreement = t('validation.required');
      }

      return errors;
    },
    [balance],
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
            label={currency}
            variant="outlined"
            type="number"
            validate={validateNumber}
          />
          <div className={classes.balance}>
            {t('polkadot-slot-auction.supportProject.balance', {
              value: balance,
              currency,
            })}
          </div>
        </div>
      </div>

      <InfoLine
        title={t('polkadot-slot-auction.supportProject.willGet', {
          currency,
        })}
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
            <Typography color="secondary" className={classes.disclaimerText}>
              {t('polkadot-slot-auction.supportProject.disclaimer', {
                currency,
                project: crowdloan.projectName,
              })}
            </Typography>
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
