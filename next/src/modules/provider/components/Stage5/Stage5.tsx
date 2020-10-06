import React from 'react';
import { useStage5Styles } from './Stage5Styles';
import classNames from 'classnames';
import { IStageProps } from '../../types';
import { useFlowControl } from '../../../../components/Flow/hooks';
import { defineFlowStep } from '../../../../components/Flow/definition';

interface IStage4Props extends IStageProps {
  nextStep(x: any): void;
}

export const Stage5Component = ({ className, nextStep }: IStage4Props) => {
  const classes = useStage5Styles();

  return <div className={classNames(classes.component, className)} />;
};

const Stage5Imp = ({ className }: IStageProps) => {
  const { moveForward } = useFlowControl();

  return <Stage5Component className={className} nextStep={moveForward} />;
};

export const Stage5 = defineFlowStep<{}, {}, IStageProps>({
  Body: Stage5Imp,
});
