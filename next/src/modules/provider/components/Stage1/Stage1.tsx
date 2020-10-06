import React from 'react';
import { useStage1Styles } from './Stage1Styles';
import classNames from 'classnames';
import { useFlowControl } from '../../../../components/Flow/hooks';
import { defineFlowStep } from '../../../../components/Flow/definition';
import { IStageProps } from '../../types';

interface IStage1Props extends IStageProps {
  nextStep(x: any): void;
}

export const Stage1Component = ({ className, nextStep }: IStage1Props) => {
  const classes = useStage1Styles();

  return <div className={classNames(classes.component, className)} />;
};

const Stage1Imp = ({ className }: IStageProps) => {
  const { moveForward } = useFlowControl();

  return <Stage1Component className={className} nextStep={moveForward} />;
};

export const Stage1 = defineFlowStep<{}, {}, IStageProps>({
  Body: Stage1Imp,
});
