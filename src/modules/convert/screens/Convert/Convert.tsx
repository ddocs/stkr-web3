import React, { useCallback, useEffect, useState } from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { useConvertStyles } from './ConvertStyles';
import { Body1 } from '../../../../UiKit/Typography';
import { t, tHTML } from '../../../../common/utils/intl';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { SliderField } from '../../../../UiKit/RangeField';
import { FormErrors } from '../../../../common/types/FormErrors';
import { Mutation, Query } from '@redux-requests/react';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { CheckboxField } from '../../../../UiKit/Checkbox/CheckboxField';
import { Button } from '../../../../UiKit/Button';
import { Quote } from '../../../../components/Quote';
import {
  Box,
  Divider,
  Paper,
  Step as MuiStep,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import { ConvertActions } from '../../actions/ConvertActions';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { QueryLoadingCentered } from '../../../../components/QueryLoading/QueryLoading';
import { IConversionStats } from '../../api/convertApi';
import { floor } from '../../../../common/utils/floor';
import { Deposit } from '../../components/Deposit';
import { Confirms } from '../../components/Confirms';
import { QueryState } from '@redux-requests/core';
import { useMutationStatus } from '../../../../common/hooks/useMutationStatus';
import { TransactionCompleted } from '../../components/TransactionCompleted';
import { useInterval } from '../../../../common/utils/useInterval';
import { Milliseconds } from '../../../../common/types';
import { useFeaturesAvailable } from '../../../../common/hooks/useFeaturesAvailable';

const MIN_AMOUNT = 0.5;
const MAX_AMOUNT = 32;
const UPDATE_INTERVAL: Milliseconds = 10000;
const NETWORK_FEE = 0.005;

enum ConvertStep {
  ChooseAmount,
  Deposit,
  TransactionGeneration,
  InProgress,
  Completed,
}

enum Step {
  Convert,
  Stake,
}

interface IConvertPayload {
  amount: number;
  agreement: boolean;
}

export interface IDepositPayload {
  depositAddress: string;
  amount: number;
}

const RenderForm = ({
  handleSubmit,
  values,
}: FormRenderProps<IConvertPayload>) => {
  const classes = useConvertStyles();

  const { stakingAmountStep } = useFeaturesAvailable();

  return (
    <Query<IConversionStats | null>
      type={(ConvertActions.fetchConversionStats as any) as string}
      showLoaderDuringRefetch={false}
    >
      {({ data }) => {
        if (!data) {
          return null;
        }

        const max = floor(
          data.availablePegETH.isLessThanOrEqualTo(MAX_AMOUNT)
            ? data.availablePegETH.toNumber()
            : MAX_AMOUNT,
          stakingAmountStep,
        );

        return (
          <>
            <Box mb={10}>
              <Typography variant="h2" align="center">
                {t('convert.title')}
              </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <Box display="flex" justifyContent="space-between" mb={4}>
                <Typography variant="h2">{t('convert.target')}</Typography>
                <Typography variant="h2">
                  {t('unit.peg-eth', { value: values.amount })}
                </Typography>
              </Box>
              <Box mb={7}>
                <Field
                  component={SliderField}
                  min={MIN_AMOUNT}
                  max={max}
                  step={stakingAmountStep}
                  name="amount"
                />
              </Box>

              <Box display="flex" justifyContent="space-between" mb={6.5}>
                <div className={classes.label}>{t('convert.fee')}</div>
                <div className={classes.value}>
                  {t('unit.eth-value', { value: NETWORK_FEE })}
                </div>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={7}>
                <div className={classes.label}>{t('convert.receive')}</div>
                <div className={classes.value}>
                  {t('unit.~eth-value', { value: values.amount - NETWORK_FEE })}
                </div>
              </Box>

              <Divider className={classes.divider} />

              <Box display="flex" justifyContent="space-between">
                <Field
                  component={CheckboxField}
                  name="agreement"
                  type="checkbox"
                  showErrorText={true}
                >
                  <Body1 variant="body1" color="secondary">
                    {tHTML('convert.terms-of-use')}
                  </Body1>
                </Field>

                <MutationErrorHandler
                  type={ConvertActions.convert.toString()}
                />
                <Mutation type={ConvertActions.convert.toString()}>
                  {({ loading }) => (
                    <Box maxWidth={220} width="100%">
                      <Button
                        color="primary"
                        size="large"
                        type="submit"
                        disabled={loading}
                        fullWidth={true}
                      >
                        {t('convert.submit')}
                      </Button>
                    </Box>
                  )}
                </Mutation>
              </Box>
            </form>
          </>
        );
      }}
    </Query>
  );
};

const Connector = () => <Box width={32} />;

interface IContentProps {
  query: QueryState<IConversionStats | null>;
}

const Content = ({ query: { data } }: IContentProps) => {
  const dispatch = useRequestDispatch();
  const { success } = useMutationStatus(ConvertActions.convert as any);

  const handleDeposit = useCallback(
    (payload: IDepositPayload) => {
      dispatch(ConvertActions.deposit(payload.depositAddress, payload.amount));
    },
    [dispatch],
  );

  const { stakingAmountStep } = useFeaturesAvailable();

  const handleSubmit = (payload: IConvertPayload) => {
    dispatch(ConvertActions.convert(payload.amount));
  };

  const [step, setStep] = useState<ConvertStep>(ConvertStep.ChooseAmount);

  useEffect(() => {
    if (
      (step === ConvertStep.ChooseAmount && success) ||
      (step === ConvertStep.Deposit && success)
    ) {
      setStep(ConvertStep.TransactionGeneration);
    } else if (
      step === ConvertStep.TransactionGeneration &&
      !!data?.latestConfirms
    ) {
      setStep(ConvertStep.InProgress);
    } else if (step === ConvertStep.InProgress && !data?.latestConfirms) {
      setStep(ConvertStep.Completed);
    }
  }, [data?.latestConfirms, step, success]);

  const validate = useCallback((payload: IConvertPayload) => {
    const errors: FormErrors<IConvertPayload> = {};

    if (!payload.amount) {
      errors.amount = t('validation.required');
    } else if (payload.amount < MIN_AMOUNT) {
      errors.amount = t('convert.validation.min-amount', { value: MIN_AMOUNT });
    }

    if (!payload.agreement) {
      errors.agreement = t('validation.required');
    }

    return errors;
  }, []);

  const renderForm = useCallback(props => <RenderForm {...props} />, []);

  if (!data) {
    return null;
  }

  if (step === ConvertStep.Completed) {
    return <TransactionCompleted />;
  }

  if (
    step === ConvertStep.TransactionGeneration ||
    step === ConvertStep.InProgress ||
    data.latestConfirms
  ) {
    return <Confirms confirms={data.latestConfirms?.depositConfirms} />;
  }

  if (data.latestWaitingForDepositSwap) {
    return (
      <>
        <MutationErrorHandler
          type={ConvertActions.deposit as any}
          resetOnShow={false}
        />
        <Mutation type={ConvertActions.deposit as any}>
          {({ loading }) => {
            if (!data?.latestWaitingForDepositSwap) {
              return null;
            }

            return (
              <Deposit
                depositAddress={data.latestWaitingForDepositSwap.depositAddress}
                amount={data.latestWaitingForDepositSwap.amount}
                onDeposit={handleDeposit}
                disabled={loading}
              />
            );
          }}
        </Mutation>
      </>
    );
  }

  const INIT_AMOUNT = floor(data.availablePegETH.toNumber(), stakingAmountStep);

  return (
    <Form
      onSubmit={handleSubmit}
      render={renderForm}
      validate={validate}
      initialValues={{ amount: INIT_AMOUNT }}
    />
  );
};

export const ConvertComponent = () => {
  return (
    <section>
      <Curtains>
        <Box display="flex" justifyContent="center" mt={6.5} mb={3}>
          <Quote>{t('convert.quote')}</Quote>
        </Box>
        <Box display="flex" justifyContent="center" mb={2}>
          <Stepper
            activeStep={Step.Convert}
            nonLinear={true}
            connector={<Connector />}
          >
            <MuiStep key={Step.Convert}>
              <StepLabel>{t('convert.step.convert')}</StepLabel>
            </MuiStep>
            <MuiStep key={Step.Stake}>
              <StepLabel>{t('convert.step.stake')}</StepLabel>
            </MuiStep>
          </Stepper>
        </Box>
        <Paper variant="outlined" square={false}>
          <Query<IConversionStats | null>
            type={(ConvertActions.fetchConversionStats as any) as string}
            errorComponent={QueryError}
            loadingComponent={QueryLoadingCentered}
            showLoaderDuringRefetch={false}
            component={Content}
          />
        </Paper>
      </Curtains>
    </section>
  );
};

export const Convert = () => {
  const dispatch = useRequestDispatch();

  useInterval(
    () => {
      dispatch(ConvertActions.fetchConversionStats());
    },
    UPDATE_INTERVAL,
    true,
  );

  return <ConvertComponent />;
};
