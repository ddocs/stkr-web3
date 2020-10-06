import React from 'react';
import { useStage2Styles } from './Stage2Styles';
import classNames from 'classnames';
import { IStageProps } from '../../types';
import { useFlowControl } from '../../../../components/Flow/hooks';
import { defineFlowStep } from '../../../../components/Flow/definition';

interface IStage1Props extends IStageProps {
  nextStep(x: any): void;
}

export const Stage2Component = ({ className, nextStep }: IStage1Props) => {
  const classes = useStage2Styles();

  return <div className={classNames(classes.component, className)} />;
};

const Stage2Imp = ({ className }: IStageProps) => {
  const { moveForward } = useFlowControl();

  return <Stage2Component className={className} nextStep={moveForward} />;
};

export const Stage2 = defineFlowStep<{}, {}, IStageProps>({
  Body: Stage2Imp,
});
