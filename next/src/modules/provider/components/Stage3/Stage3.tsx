import React from 'react';
import classNames from 'classnames';
import { IStageProps } from '../../types';
import { useFlowControl } from '../../../../components/Flow/hooks';
import { defineFlowStep } from '../../../../components/Flow/definition';
import { useStage3Styles } from './Stage3Styles';

interface IStage3Props extends IStageProps {
  nextStep(x: any): void;
}

export const Stage3Component = ({ className, nextStep }: IStage3Props) => {
  const classes = useStage3Styles();

  return <div className={classNames(classes.component, className)} />;
};

const Stage3Imp = ({ className }: IStageProps) => {
  const { moveForward } = useFlowControl();

  return <Stage3Component className={className} nextStep={moveForward} />;
};

export const Stage3 = defineFlowStep<{}, {}, IStageProps>({
  Body: Stage3Imp,
});
