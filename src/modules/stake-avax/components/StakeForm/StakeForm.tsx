import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { t } from '../../../../common/utils/intl';
import { roundByStep } from '../../../../common/utils/numbers/roundByStep';
import { Button } from '../../../../UiKit/Button';
import { SliderField } from '../../../../UiKit/RangeField';
import { Body2, Headline2 } from '../../../../UiKit/Typography';
import { useStakeFormStyles } from './StakeFormStyles';

const MIN_AMOUNT = 1;
const STAKING_AMOUNT_STEP = 1;

export interface IStakeFormValues {
  amount: number;
  agreement: boolean;
}

export interface IStakeFormComponentProps {
  onSubmit: (payload: IStakeFormValues) => void;
  maxAmount: BigNumber;
  loading: boolean;
  currency?: string;
}

export const StakeForm = ({
  onSubmit,
  maxAmount,
  loading,
  currency = t('unit.avax'),
}: IStakeFormComponentProps) => {
  const classes = useStakeFormStyles();
  const max = useMemo(() => Math.floor(maxAmount.toNumber()), [maxAmount]);

  const handleInputAmountBlur =
    (onChange: (v: any) => void, onBlur: () => void) =>
    (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur();
      let nearestValue = roundByStep(+e.target.value, STAKING_AMOUNT_STEP);
      nearestValue = Math.min(nearestValue, max);
      nearestValue = Math.max(nearestValue, MIN_AMOUNT);

      onChange(nearestValue);
    };

  const renderForm = ({
    handleSubmit,
    values: { amount },
  }: FormRenderProps<any>) => {
    const renderedAmount =
      amount > max ? max : amount < MIN_AMOUNT ? 0 : amount;

    return (
      <form onSubmit={handleSubmit}>
        <div className={classes.body}>
          <div className={classes.container}>
            <label className={classes.range}>
              <Headline2 classes={{ root: classes.label }}>
                <div className={classes.labelText}>{t('stake.i-want')}</div>

                <div className={classes.amount}>
                  <Field name="amount">
                    {props => (
                      <input
                        {...props.input}
                        className={classes.inputAmount}
                        onBlur={handleInputAmountBlur(
                          props.input.onChange,
                          props.input.onBlur,
                        )}
                        type="number"
                        max={max}
                        min={0}
                      />
                    )}
                  </Field>

                  <span>{currency}</span>
                </div>
              </Headline2>

              <Field
                component={SliderField}
                min={0}
                max={max}
                step={MIN_AMOUNT}
                name="amount"
              />
            </label>

            <div className={classes.earnings} />
          </div>
        </div>

        <div className={classes.footer}>
          <div className={classNames(classes.container, classes.footerWrapper)}>
            <Body2 className={classes.info} color="secondary" component="p">
              {t('stake-avax.stake.info')}
            </Body2>

            <Button
              color="primary"
              size="large"
              className={classes.submit}
              type="submit"
              disabled={amount <= 0 || loading}
              isLoading={loading}
            >
              {t('stake-avax.stake.btn', {
                value: renderedAmount,
              })}
            </Button>
          </div>
        </div>
      </form>
    );
  };

  return maxAmount.gte(MIN_AMOUNT) ? (
    <Form
      onSubmit={onSubmit}
      render={renderForm}
      initialValues={{ amount: 0 }}
    />
  ) : (
    <Body2 className={classes.warning} color="secondary" component="p">
      {t('stake-avax.not-enough-stake')}
    </Body2>
  );
};
