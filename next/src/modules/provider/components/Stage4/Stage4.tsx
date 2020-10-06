import React, { useEffect } from 'react';
import { useStage4Styles } from './Stage4Styles';
import classNames from 'classnames';
import { IStageProps } from '../../types';
import { useFlowControl } from '../../../../components/Flow/hooks';
import { defineFlowStep } from '../../../../components/Flow/definition';
import { Body1, Headline2 } from '../../../../UiKit/Typography';
import { t, tHTML } from '../../../../common/utils/intl';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { Icon } from './Icon';

interface IStage4Props extends IStageProps {}

export const Stage4Component = ({ className }: IStage4Props) => {
  const classes = useStage4Styles();

  return (
    <div className={classNames(classes.component, className)}>
      <Headline2 component="span" className={classes.title}>
        {tHTML('provider.create.stage-4.generation')}
      </Headline2>
      <ProgressBar className={classes.bar} />
      <Body1 component="span" color="secondary" className={classes.text}>
        {t('provider.create.stage-4.note')}
      </Body1>
      <Icon className={classes.icon} />
    </div>
  );
};

const Stage4Imp = ({ className }: IStageProps) => {
  const { moveForward } = useFlowControl();

  useEffect(() => {
    // TODO: replace by real function
    setTimeout(moveForward, 2000);
  }, [moveForward]);

  return <Stage4Component className={className} />;
};

export const Stage4 = defineFlowStep<{}, {}, IStageProps>({
  Body: Stage4Imp,
});
