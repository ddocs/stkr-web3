import React, { useCallback, useMemo } from 'react';
import { useStage6Styles } from './CreateMicropoolStage1Styles';
import classNames from 'classnames';
import { IStageProps } from '../../types';
import { useFlowControl } from '../../../../components/Flow/hooks';
import { defineFlowStep } from '../../../../components/Flow/definition';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { Form } from 'react-final-form';
import { ISelectOption } from '../../../../UiKit/SelectField/SelectField';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import { RenderForm } from './RenderForm';
import { NavLink } from '../../../../UiKit/Link';
import { PROVIDER_PATH } from '../../../../common/const';

export interface ICreateMicropoolStage1StoreProps {
  beacon: ISelectOption[];
}

interface ICreateMicropoolStage1Props
  extends ICreateMicropoolStage1StoreProps,
    IStageProps {
  disabled?: boolean;

  nextStep(x: any): void;
}

export const CreateMicropoolStage1Component = ({
  className,
  beacon,
  disabled,
  nextStep,
}: ICreateMicropoolStage1Props) => {
  const classes = useStage6Styles();

  const initialValues = useMemo(
    () => ({
      'beacon-node': beacon[0].value,
    }),
    [beacon],
  );

  return (
    <div className={classNames(classes.component, className)}>
      <NavLink className={classes.close} color="primary" href={PROVIDER_PATH}>
        <CancelIcon />
      </NavLink>
      <Form
        render={formProps => (
          <RenderForm disabled={disabled} beacon={beacon} {...formProps} />
        )}
        onSubmit={nextStep}
        initialValues={initialValues}
      />
    </div>
  );
};

const Stage6Imp = ({
  className,
  ...props
}: ICreateMicropoolStage1StoreProps & IStageProps) => {
  const { moveForward } = useFlowControl();

  const handleNextStep = useCallback(() => {
    // TODO: add function
    moveForward();
  }, [moveForward]);

  return (
    <CreateMicropoolStage1Component
      className={className}
      nextStep={handleNextStep}
      {...props}
    />
  );
};

const CreateMicropoolStage1Connected = connect(
  (state: IStoreState) => ({
    beacon: [{ value: '1', label: 'Alex_Beacon_Node' }],
  }),
  {},
)(Stage6Imp);

export const CreateMicropoolStage1 = defineFlowStep<{}, {}, IStageProps>({
  Body: CreateMicropoolStage1Connected,
});
