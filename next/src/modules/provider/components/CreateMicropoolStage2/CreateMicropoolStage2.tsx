import React, { useEffect } from 'react';
import { useStage7Styles } from './CreateMicropoolStage2Styles';
import classNames from 'classnames';
import { IStageProps } from '../../types';
import { useFlowControl } from '../../../../components/Flow/hooks';
import { defineFlowStep } from '../../../../components/Flow/definition';
import { Body2, Headline2 } from '../../../../UiKit/Typography';
import { t, tHTML } from '../../../../common/utils/intl';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { Icon } from '../CreateBeaconChainStage2/Icon';

interface ICreateMicropoolStage2Props extends IStageProps {}

export const CreateMicropoolStage2Component = ({
  className,
}: ICreateMicropoolStage2Props) => {
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

const CreateMicropoolStage2Imp = ({ className }: IStageProps) => {
  const { moveForward } = useFlowControl();

  useEffect(() => {
    // TODO: replace by real function
    setTimeout(moveForward, 2000);
  }, [moveForward]);

  return <CreateMicropoolStage2Component className={className} />;
};

export const CreateMicropoolStage2 = defineFlowStep<{}, {}, IStageProps>({
  Body: CreateMicropoolStage2Imp,
});
