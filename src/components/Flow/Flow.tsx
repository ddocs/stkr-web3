import React, { useCallback, useMemo, useReducer, useState } from 'react';

import { FlowContext, IFlowControl } from './context';

import { FlowStep, FlowSubmitCallback } from './types';

type FlowProps<T extends object, Props extends object, K = any> = Props & {
  initialData?: T;
  steps: FlowStep<any, K, Props>[];

  children(
    stepBody: React.ReactNode,
    control: IFlowControl<T>,
  ): React.ReactNode;

  onComplete(data: K): void;
};

const passThrough = <T extends any>(_: any, x: T) => x;

export function Flow<T extends object = {}, P extends object = {}>({
  steps,
  initialData,
  onComplete,
  children,
  ...props
}: FlowProps<T, P>) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<object>(initialData || {});
  const [submitAction, setSubmitAction] = useReducer(
    passThrough,
    undefined as FlowSubmitCallback,
  );
  const [validationStatus, setValidationStatus] = useState<any>(undefined);

  const hasNextStep = step < steps.length - 1;

  const moveStepBack = useCallback(
    () => setStep(prevStep => Math.max(0, prevStep - 1)),
    [],
  );

  const moveStepForward = useCallback(() => {
    if (hasNextStep) {
      setSubmitAction(undefined);
      setValidationStatus(undefined);
      setStep(step + 1);
    } else {
      onComplete(data);
    }
  }, [hasNextStep, data, step, onComplete]);

  const addData = useCallback((newData: any) => {
    setData(oldData => ({
      ...oldData,
      ...newData,
    }));
  }, []);

  const stepProps: any = props;

  const contextValue: IFlowControl<T> = useMemo(
    () => ({
      data,
      validationStatus,
      steps,
      currentStepRef: steps[step],
      currentStep: step,
      isLastStep: step === steps.length - 1,

      moveForward: () => {
        const currentStep = steps[step];
        if (submitAction) {
          submitAction();
        }
        const validateResult =
          !currentStep.validate || currentStep.validate(data, stepProps);
        if (validateResult !== true) {
          setValidationStatus(validateResult);
          return;
        }
        moveStepForward();
      },
      moveBack: moveStepBack,
      addData,
      onMoveForward: setSubmitAction,
    }),
    [
      addData,
      data,
      validationStatus,
      moveStepBack,
      moveStepForward,
      step,
      stepProps,
      steps,
      submitAction,
    ],
  );

  const { Body } = steps[step];

  return (
    <FlowContext.Provider value={contextValue}>
      {children(
        <Body hasNextStep={hasNextStep} {...stepProps} />,
        contextValue,
      )}
    </FlowContext.Provider>
  );
}
