import React from 'react';
import { useStage7Styles } from './Stage7Styles';
import classNames from 'classnames';
import { IStageProps } from '../../types';
import { useFlowControl } from '../../../../components/Flow/hooks';
import { defineFlowStep } from '../../../../components/Flow/definition';

interface IStage7Props extends IStageProps {
  nextStep(x: any): void;
}

export const Stage7Component = ({ className, nextStep }: IStage7Props) => {
  const classes = useStage7Styles();

  return <div className={classNames(classes.component, className)} />;
};

const Stage7Imp = ({ className }: IStageProps) => {
  const { moveForward } = useFlowControl();

  return <Stage7Component className={className} nextStep={moveForward} />;
};

export const Stage7 = defineFlowStep<{}, {}, IStageProps>({
  Body: Stage7Imp,
});
