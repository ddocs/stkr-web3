import { Field, FormRenderProps } from 'react-final-form';
import { t, tHTML } from '../../../../common/utils/intl';
import { InputField } from '../../../../UiKit/InputField';
import { RangeField } from '../../../../UiKit/RangeField';
import { Body1, Body2, Headline2 } from '../../../../UiKit/Typography';
import { SelectField } from '../../../../UiKit/SelectField';
import { Amount } from '../Amount';
import { Button } from '../../../../UiKit/Button';
import React from 'react';
import { useStage6Styles } from './Stage6Styles';
import { IStage6StoreProps } from './types';

interface IRenderFormProps extends IStage6StoreProps {
  disabled?: boolean;
}

export const RenderForm = ({
  handleSubmit,
  disabled,
  balance,
  amount,
  price,
  beacon,
}: FormRenderProps<any> & IRenderFormProps) => {
  const classes = useStage6Styles();

  const disabledSubmit = disabled || balance < amount;

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <h2 className={classes.title}>
        {tHTML('provider.create.stage-6.title')}
      </h2>
      <div className={classes.fieldset}>
        <Field
          className={classes.input}
          component={InputField}
          name="email"
          type="text"
          label={t('navigation.micropool-name')}
        />
        <Field
          className={classes.input}
          component={RangeField}
          name="fee"
          label={t('navigation.fee')}
        />
        <Body2 className={classes.price} color="secondary" component="span">
          {tHTML('provider.create.stage-6.price', { value: price })}
        </Body2>
        <Field
          className={classes.input}
          component={SelectField}
          name="beacon-node"
          label={t('navigation.beacon-name-node')}
          values={beacon}
        />
      </div>
      <div className={classes.balance}>
        <Headline2 className={classes.note} component="h3" color="primary">
          {t('provider.create.stage-6.note')}
        </Headline2>
        <Body1 className={classes.text} component="p" color="secondary">
          {t('provider.create.stage-6.text')}
        </Body1>
        <div className={classes.refill}>
          <Amount
            className={classes.amount}
            caption={t('provider.create.stage-6.balance')}
            value={balance}
          >
            <Button variant="outlined" size="small" color="secondary">
              {t('navigation.buy')}
            </Button>
          </Amount>
          <Amount
            className={classes.neededAmount}
            caption={t('provider.create.stage-6.amount')}
            value={amount}
          />
          <Button
            className={classes.submit}
            color="primary"
            size="large"
            variant="contained"
            submit
            disabled={disabledSubmit}
            aria-label="submit"
          >
            {t('navigation.create-pool')}
          </Button>
        </div>
      </div>
    </form>
  );
};
