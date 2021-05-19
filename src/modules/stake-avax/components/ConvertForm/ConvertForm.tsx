import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import { InputField } from '../../../../UiKit/InputField';
import { SliderField } from '../../../../UiKit/RangeField';
import { Body2, Headline2 } from '../../../../UiKit/Typography';
import { IConvertPayload } from '../../../avalanche-sdk/types';
import { useConvertFormStyles } from './ConvertFormStyles';

const MIN_AMOUNT = 1;

export interface IConvertFormProps {
  maxAmount: BigNumber;
  loading: boolean;
  onSubmit: (payload: IConvertPayload) => void;
}

export const ConvertForm = ({
  loading,
  maxAmount,
  onSubmit,
}: IConvertFormProps) => {
  const classes = useConvertFormStyles();
  const max = useMemo(() => Math.floor(maxAmount.toNumber()), [maxAmount]);

  const renderValue = useCallback(
    value =>
      t('unit.aavaxb-value', {
        value,
      }),
    [],
  );

  const validateStakeForm = useCallback(() => ({}), []);
  const renderForm = ({
    handleSubmit,
    values: { amount, address },
  }: FormRenderProps<any>) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className={classes.body}>
          <div className={classes.wrapper}>
            <label className={classes.range}>
              <Headline2 component="p" classes={{ root: classes.label }}>
                {t('stake-avax.convert.i-want')}

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
            <Field
              classes={{ root: classes.input }}
              component={InputField}
              name="address"
              label={t('stake-avax.convert.address')}
              variant="outlined"
              fullWidth
            />
          </div>
        </div>
        <div className={classes.footer}>
          <div className={classNames(classes.wrapper, classes.footerWrapper)}>
            <Button
              color="primary"
              size="large"
              className={classes.submit}
              type="submit"
              disabled={amount <= 0 || !address || loading}
            >
              {t('stake-avax.convert.convert')}
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
      validate={validateStakeForm}
      initialValues={{
        amount: 0,
      }}
    />
  ) : (
    <Body2 className={classes.warning} color="secondary" component="p">
      {t('stake-avax.not-enough-convert')}
    </Body2>
  );
};
