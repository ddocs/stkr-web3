import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React, { ReactNode, useCallback, useMemo } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import { SliderField } from '../../../../UiKit/RangeField';
import { Body2, Headline2 } from '../../../../UiKit/Typography';
import { useStakeFormStyles } from './StakeFormStyles';
import { Spinner } from '../../../../components/Spinner';

const MIN_AMOUNT = 1;

export interface IStakePayload {
  amount: number;
  agreement: boolean;
}

export interface IStakeFormComponentProps {
  onSubmit: (payload: IStakePayload) => void;
  maxAmount: BigNumber;
  loading: boolean;
  renderValue?: (value: BigNumber) => ReactNode;
}

export const StakeForm = ({
  onSubmit,
  maxAmount,
  loading,
  renderValue = value =>
    t('unit.avax-value', {
      value,
    }),
}: IStakeFormComponentProps) => {
  const classes = useStakeFormStyles();
  const max = useMemo(() => Math.floor(maxAmount.toNumber()), [maxAmount]);

  const validateStakeForm = useCallback(
    ({ amount }: IStakePayload) => ({}),
    [],
  );

  const renderForm = ({
    handleSubmit,
    values: { amount },
  }: FormRenderProps<any>) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className={classes.body}>
          <div className={classes.wrapper}>
            <label className={classes.range}>
              <Headline2 component="p" classes={{ root: classes.label }}>
                {t('stake.i-want')}

                <span className={classes.amount}>
                  {renderValue(new BigNumber(amount))}
                </span>
              </Headline2>

              <Field
                component={SliderField}
                min={0}
                max={max}
                step={MIN_AMOUNT}
                name="amount"
              />
            </label>
          </div>
          <div className={classes.earnings} />
        </div>

        <div className={classes.footer}>
          <div className={classNames(classes.wrapper, classes.footerWrapper)}>
            <Body2 className={classes.info} color="secondary" component="p">
              {t('stake-avax.info')}
            </Body2>
            {!loading ? (
              <Button
                color="primary"
                size="large"
                className={classes.submit}
                type="submit"
                disabled={amount <= 0 || loading}
              >
                {t('stake.stake')}
              </Button>
            ) : (
              <Spinner size={32} />
            )}
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
      validate={validateStakeForm}
    />
  ) : (
    <Body2 className={classes.warning} color="secondary" component="p">
      {t('stake-avax.not-enough-stake')}
    </Body2>
  );
};
