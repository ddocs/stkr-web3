import React, { useCallback } from 'react';
import classNames from 'classnames';
import { IStageProps } from '../../types';
import { useFlowControl } from '../../../../components/Flow/hooks';
import { defineFlowStep } from '../../../../components/Flow/definition';
import { useStage3Styles } from './Stage3Styles';
import { Body2, Headline2 } from '../../../../UiKit/Typography';
import { t, tHTML } from '../../../../common/utils/intl';
import { Icon } from './Icon';
import { Button } from '../../../../UiKit/Button';

interface IStage3Props extends IStageProps {
  nextStep(x: any): void;
}

export const Stage3Component = ({ className, nextStep }: IStage3Props) => {
  const classes = useStage3Styles();

  return (
    <div className={classNames(classes.component, className)}>
      <Headline2 component="span" color="primary" className={classes.title}>
        {tHTML('provider.create.stage-3.create-node')}
      </Headline2>
      <Body2 component="span" color="secondary" className={classes.text}>
        {t('provider.create.stage-3.create-node-description')}
      </Body2>
      <Button
        className={classes.button}
        color="primary"
        size="large"
        onClick={nextStep}
      >
        {t('navigation.create')}
      </Button>
      <Icon className={classes.icon} />
    </div>
  );
};

const Stage3Imp = ({ className }: IStageProps) => {
  const { moveForward } = useFlowControl();

  const handleNextStep = useCallback(() => {
    // TODO: add function
    moveForward();
  }, [moveForward]);

  return <Stage3Component className={className} nextStep={handleNextStep} />;
};

export const Stage3 = defineFlowStep<{}, {}, IStageProps>({
  Body: Stage3Imp,
});
