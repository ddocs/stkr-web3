import React from 'react';
import { useStage8Styles } from './Stage8Styles';
import classNames from 'classnames';
import { IStageProps } from '../../types';
import { useFlowControl } from '../../../../components/Flow/hooks';
import { defineFlowStep } from '../../../../components/Flow/definition';

interface IStage8Props extends IStageProps {
  nextStep(x: any): void;
}

export const Stage8Component = ({ className, nextStep }: IStage8Props) => {
  const classes = useStage8Styles();

  return <div className={classNames(classes.component, className)} />;
};

const Stage8Imp = ({ className }: IStageProps) => {
  const { moveForward } = useFlowControl();

  return <Stage8Component className={className} nextStep={moveForward} />;
};

export const Stage8 = defineFlowStep<{}, {}, IStageProps>({
  Body: Stage8Imp,
});
