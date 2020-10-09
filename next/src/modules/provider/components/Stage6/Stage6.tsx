import React, { useCallback, useMemo } from 'react';
import { useStage6Styles } from './Stage6Styles';
import classNames from 'classnames';
import { IStageProps } from '../../types';
import { useFlowControl } from '../../../../components/Flow/hooks';
import { defineFlowStep } from '../../../../components/Flow/definition';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { Button } from '../../../../UiKit/Button';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { InputField } from '../../../../UiKit/InputField';
import { t, tHTML } from '../../../../common/utils/intl';
import { RangeField } from '../../../../UiKit/RangeField';
import { SelectField } from '../../../../UiKit/SelectField';
import { ISelectOption } from '../../../../UiKit/SelectField/SelectField';
import { Body2, Headline2 } from '../../../../UiKit/Typography';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';

interface IStage6StoreProps {
  balance: number;
  amount: number;
  price?: number | string;
  beacon: ISelectOption[];
}

interface IStage6Props extends IStage6StoreProps, IStageProps {
  disabled?: boolean;

  nextStep(x: any): void;

  prevStep(x: any): void;
}

export const Stage6Component = ({
  className,
  balance,
  amount = 1000000,
  price,
  beacon,
  disabled,
  prevStep,
  nextStep,
}: IStage6Props) => {
  const classes = useStage6Styles();

  const disabledSubmit = disabled || balance < amount;

  const renderForm = ({ handleSubmit }: FormRenderProps<any>) => {
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
            name="duration"
            label={t('navigation.duration')}
          />
          <Field
            className={classes.input}
            component={RangeField}
            name="fee"
            label={t('navigation.fee')}
          />
          <Field
            className={classes.input}
            component={InputField}
            name="price"
            type="number"
            label={t('navigation.price')}
            readOnly={true}
          />
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
          <Body2 className={classes.text} component="p" color="secondary">
            {t('provider.create.stage-6.text')}
          </Body2>
          <div>
            <p>{balance}</p>
            <p>{amount}</p>
            <Button
              className={classes.button}
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

  const initialValues = useMemo(
    () => ({
      price: price,
      'beacon-node': beacon[0].value,
    }),
    [price],
  );

  return (
    <BackgroundColorProvider
      className={classNames(classes.component, className)}
    >
      <Button
        className={classes.close}
        onClick={prevStep}
        color="primary"
        variant="text"
      >
        <CancelIcon />
      </Button>
      <Form
        render={renderForm}
        onSubmit={nextStep}
        initialValues={initialValues}
      />
    </BackgroundColorProvider>
  );
};

const Stage6Imp = ({
  className,
  ...props
}: IStageProps & IStage6StoreProps) => {
  const { moveForward, moveBack } = useFlowControl();

  const handleNextStep = useCallback(() => {
    // TODO: add function
    moveForward();
  }, [moveForward]);

  return (
    <Stage6Component
      className={className}
      nextStep={handleNextStep}
      prevStep={moveBack}
      {...props}
    />
  );
};

const Step6Connected = connect(
  (state: IStoreState) => ({
    balance: 0,
    amount: 1000000,
    price: 32,
    beacon: [{ value: '1', label: 'Alex_Beacon_Node' }],
  }),
  {},
)(Stage6Imp);

export const Stage6 = defineFlowStep<{}, {}, IStageProps>({
  Body: Step6Connected,
});
