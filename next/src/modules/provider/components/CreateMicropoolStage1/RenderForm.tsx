import { Field, FormRenderProps } from 'react-final-form';
import { t } from '../../../../common/utils/intl';
import { SelectField } from '../../../../UiKit/SelectField';
import { Button } from '../../../../UiKit/Button';
import React, { useCallback } from 'react';
import { useStage6Styles } from './CreateMicropoolStage1Styles';
import { ICreateMicropoolStage1StoreProps } from './CreateMicropoolStage1';
import {
  Body2,
  Headline1,
  Headline4,
  Headline6,
} from '../../../../UiKit/Typography';

interface IRenderFormProps extends ICreateMicropoolStage1StoreProps {
  disabled?: boolean;
  error?: any;
}

export const RenderForm = ({
  handleSubmit,
  disabled,
  beacon,
  error,
}: FormRenderProps<any> & IRenderFormProps) => {
  const classes = useStage6Styles();

  const handleBuy = useCallback(() => {
    alert('You have bought 100,000 ANKR');
  }, []);

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Headline1 className={classes.title} component="h3" color="primary">
        {t('provider.create.create-micropool-stage-1.title')}
      </Headline1>
      <ul className={classes.list}>
        <li className={classes.item}>
          <Headline6 className={classes.count} component="span" color="primary">
            {t('provider.create.create-micropool-stage-1.form.step-1.count')}
          </Headline6>
          <Headline4 className={classes.caption} component="h4">
            {t('provider.create.create-micropool-stage-1.form.step-1.caption')}
          </Headline4>
          <Field
            className={classes.input}
            component={SelectField}
            name="beacon-node"
            values={beacon}
            color="secondary"
            withoutUnderline={true}
          />
        </li>
        <li className={classes.item}>
          <Headline6 className={classes.count} component="span" color="primary">
            {t('provider.create.create-micropool-stage-1.form.step-2.count')}
          </Headline6>
          <Headline4 className={classes.caption} component="h4">
            {t('provider.create.create-micropool-stage-1.form.step-2.caption')}
          </Headline4>
          <Body2 className={classes.text} component="p" color="secondary">
            {t('provider.create.create-micropool-stage-1.form.step-2.text')}
          </Body2>
          <Button
            className={classes.buy}
            variant="outlined"
            size="large"
            color="primary"
            onClick={handleBuy}
          >
            {t('navigation.buy')}
          </Button>
        </li>
      </ul>
      <Button
        className={classes.submit}
        color="primary"
        size="large"
        variant="contained"
        submit
        disabled={disabled}
        aria-label="submit"
      >
        {t('navigation.create-pool')}
      </Button>
      {error ? <div>Can't process your request</div> : null}
    </form>
  );
};
