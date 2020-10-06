import React from 'react';
import { useStage4Styles } from './Stage4Styles';
import classNames from 'classnames';
import { IStageProps } from '../../types';
import { useFlowControl } from '../../../../components/Flow/hooks';
import { defineFlowStep } from '../../../../components/Flow/definition';

interface IStage4Props extends IStageProps {
  nextStep(x: any): void;
}

export const Stage4Component = ({ className, nextStep }: IStage4Props) => {
  const classes = useStage4Styles();

  return <div className={classNames(classes.component, className)} />;
};

const Stage4Imp = ({ className }: IStageProps) => {
  const { moveForward } = useFlowControl();

  return <Stage4Component className={className} nextStep={moveForward} />;
};

export const Stage4 = defineFlowStep<{}, {}, IStageProps>({
  Body: Stage4Imp,
});
