import React, { useEffect } from 'react';
import { useStage2Styles } from './Stage2Styles';
import classNames from 'classnames';
import { IStageProps } from '../../types';
import { useFlowControl } from '../../../../components/Flow/hooks';
import { defineFlowStep } from '../../../../components/Flow/definition';
import { Body2, Headline2 } from '../../../../UiKit/Typography';
import { t, tHTML } from '../../../../common/utils/intl';
import { Icon } from './Icon';
import { ProgressBar } from '../ProgressBar/ProgressBar';

interface IStage2Props extends IStageProps {}

export const Stage2Component = ({ className }: IStage2Props) => {
  const classes = useStage2Styles();

  return (
    <div className={classNames(classes.component, className)}>
      <Headline2 component="span" color="primary" className={classes.title}>
        {tHTML('provider.create.stage-2.confirmation')}
      </Headline2>
      <ProgressBar className={classes.bar} />
      <Body2 component="span" color="secondary" className={classes.text}>
        {t('provider.create.stage-2.note')}
      </Body2>
      <Icon className={classes.icon} />
    </div>
  );
};

const Stage2Imp = ({ className }: IStageProps) => {
  const { moveForward } = useFlowControl();

  useEffect(() => {
    // TODO: replace by real function
    setTimeout(moveForward, 2000);
  }, [moveForward]);

  return <Stage2Component className={className} />;
};

export const Stage2 = defineFlowStep<{}, {}, IStageProps>({
  Body: Stage2Imp,
});
