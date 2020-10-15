import React, { useEffect } from 'react';
import { useStage7Styles } from './Stage7Styles';
import classNames from 'classnames';
import { IStageProps } from '../../types';
import { useFlowControl } from '../../../../components/Flow/hooks';
import { defineFlowStep } from '../../../../components/Flow/definition';
import { Body2, Headline2 } from '../../../../UiKit/Typography';
import { t, tHTML } from '../../../../common/utils/intl';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { Icon } from '../CreateBeaconChainStage2/Icon';

interface IStage7Props extends IStageProps {}

export const Stage7Component = ({ className }: IStage7Props) => {
  const classes = useStage7Styles();

  return (
    <div className={classNames(classes.component, className)}>
      <Headline2 component="span" className={classes.title}>
        {tHTML('provider.create.stage-7.generation')}
      </Headline2>
      <ProgressBar className={classes.bar} />
      <Body2 component="span" color="secondary" className={classes.text}>
        {t('provider.create.stage-7.note')}
      </Body2>
      <Icon className={classes.icon} />
    </div>
  );
};

const Stage7Imp = ({ className }: IStageProps) => {
  const { moveForward } = useFlowControl();

  useEffect(() => {
    // TODO: replace by real function
    setTimeout(moveForward, 2000);
  }, [moveForward]);

  return <Stage7Component className={className} />;
};

export const Stage7 = defineFlowStep<{}, {}, IStageProps>({
  Body: Stage7Imp,
});
