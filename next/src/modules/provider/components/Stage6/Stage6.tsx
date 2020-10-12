import React, { useCallback, useMemo } from 'react';
import { useStage6Styles } from './Stage6Styles';
import classNames from 'classnames';
import { IStageProps } from '../../types';
import { useFlowControl } from '../../../../components/Flow/hooks';
import { defineFlowStep } from '../../../../components/Flow/definition';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { Button } from '../../../../UiKit/Button';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { Form } from 'react-final-form';
import { ISelectOption } from '../../../../UiKit/SelectField/SelectField';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import { RenderForm } from './RenderForm';

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

  const initialValues = useMemo(
    () => ({
      'beacon-node': beacon[0].value,
    }),
    [beacon],
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
        render={formProps => (
          <RenderForm
            disabled={disabled}
            balance={balance}
            amount={amount}
            price={price}
            beacon={beacon}
            {...formProps}
          />
        )}
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
    balance: 1000000,
    amount: 1000000,
    price: 32,
    beacon: [{ value: '1', label: 'Alex_Beacon_Node' }],
  }),
  {},
)(Stage6Imp);

export const Stage6 = defineFlowStep<{}, {}, IStageProps>({
  Body: Step6Connected,
});
