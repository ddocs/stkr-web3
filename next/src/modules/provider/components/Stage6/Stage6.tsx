import React from 'react';
import { useStage6Styles } from './Stage6Styles';
import classNames from 'classnames';
import { IStageProps } from '../../types';
import { useFlowControl } from '../../../../components/Flow/hooks';
import { defineFlowStep } from '../../../../components/Flow/definition';

interface IStage6Props extends IStageProps {
  nextStep(x: any): void;
}

export const Stage6Component = ({ className, nextStep }: IStage6Props) => {
  const classes = useStage6Styles();

  return <div className={classNames(classes.component, className)}></div>;
};

const Stage6Imp = ({ className }: IStageProps) => {
  const { moveForward } = useFlowControl();

  return <Stage6Component className={className} nextStep={moveForward} />;
};

export const Stage6 = defineFlowStep<{}, {}, IStageProps>({
  Body: Stage6Imp,
});
