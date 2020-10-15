import React, { useEffect } from 'react';
import { useCreateBeaconChainStage2Styles } from './CreateBeaconChainStage2Styles';
import classNames from 'classnames';
import { IStageProps } from '../../types';
import { useFlowControl } from '../../../../components/Flow/hooks';
import { defineFlowStep } from '../../../../components/Flow/definition';
import { Body2, Headline2 } from '../../../../UiKit/Typography';
import { t, tHTML } from '../../../../common/utils/intl';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { Icon } from './Icon';

interface ICreateBeaconChainStage2Props extends IStageProps {}

export const CreateBeaconChainStage2Component = ({
  className,
}: ICreateBeaconChainStage2Props) => {
  const classes = useCreateBeaconChainStage2Styles();

  return (
    <div className={classNames(classes.component, className)}>
      <Headline2 component="span" className={classes.title} color="primary">
        {tHTML('provider.create.create-beacon-chain-stage-2.title')}
      </Headline2>
      <ProgressBar className={classes.bar} />
      <Body2 component="span" color="secondary" className={classes.text}>
        {t('provider.create.create-beacon-chain-stage-2.note')}
      </Body2>
      <Icon className={classes.icon} />
    </div>
  );
};

const CreateBeaconChainStage2Imp = ({ className }: IStageProps) => {
  const { moveForward } = useFlowControl();

  useEffect(() => {
    // TODO: replace by real function
    setTimeout(moveForward, 2000);
  }, [moveForward]);

  return <CreateBeaconChainStage2Component className={className} />;
};

export const CreateBeaconChainStage2 = defineFlowStep<{}, {}, IStageProps>({
  Body: CreateBeaconChainStage2Imp,
});
