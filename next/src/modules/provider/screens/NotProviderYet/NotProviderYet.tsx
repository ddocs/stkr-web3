import React, { useState } from 'react';
import { useNotProviderYetStyles } from './NotProviderYetStyles';
import { uid } from 'react-uid';
import { Flow } from '../../../../components/Flow';
import { defineFlow } from '../../../../components/Flow/definition';
import { Stage1 } from '../../components/Stage1';
import { Stage2 } from '../../components/Stage2';
import { Stage3 } from '../../components/Stage3';
import { Stage4 } from '../../components/Stage4';
import { Stage6 } from '../../components/Stage6';
import { Stage7 } from '../../components/Stage7';
import { Stage5 } from '../../components/Stage5';
import classNames from 'classnames';
import { Curtains } from '../../../../UiKit/Curtains';
import { t } from '../../../../common/utils/intl';
import { SmallTitle } from '../../../../UiKit/Typography';
import { Stage8 } from '../../components/Stage8';

interface INotProviderYetProps {
  className?: string;
}

const getCaptionByStage = (stage: number) => {
  switch (stage) {
    case 1:
      return 'navigation.apply-as-provider';
    case 2:
      return undefined;
    case 3:
      return 'navigation.create-beacon-chain';
    case 4:
      return undefined;
    case 5:
      return 'navigation.create-micropool';
    case 6:
      return undefined;
    case 7:
      return undefined;
    case 8:
      return 'navigation.become-provider';
  }
  return undefined;
};

const STEPS = defineFlow(
  Stage1,
  Stage2,
  Stage3,
  Stage4,
  Stage5,
  Stage6,
  Stage7,
  Stage8,
);

export const NotProviderYet = ({ className }: INotProviderYetProps) => {
  const classes = useNotProviderYetStyles();

  const [steps] = useState(STEPS);

  return (
    <section className={classNames(classes.component, className)}>
      <Flow key={uid(steps)} steps={steps} onComplete={() => null}>
        {(body, { currentStep, isLastStep, steps, moveBack, moveForward }) => {
          return (
            <>
              <div className={classes.header}>
                <Curtains classes={{ root: classes.breadcrumbs }}>
                  <ul className={classes.list}>
                    {steps.map((step, index) => {
                      const caption = getCaptionByStage(index + 1);
                      const isLoadingStage =
                        index === 1 || index === 3 || index === 6;
                      const isLastStage = index === steps.length - 1;
                      const isSubStage = index === 5;
                      const isActive =
                        index === currentStep ||
                        (currentStep === 5 && index === 4);
                      const isFinishedStage =
                        index < currentStep &&
                        !(currentStep === 5 && index === 4);
                      return (
                        <SmallTitle
                          key={uid(step)}
                          className={classNames(
                            classes.item,
                            isActive && classes.activeStage,
                            isFinishedStage && classes.finishedStage,
                            isLastStage && classes.lastStage,
                            isLoadingStage && classes.loadingStage,
                            isSubStage && classes.subStage,
                          )}
                          component="li"
                        >
                          {caption !== undefined && t(caption)}
                        </SmallTitle>
                      );
                    })}
                  </ul>
                </Curtains>
              </div>
              <div className={classes.content}>
                <Curtains classes={{ root: classes.wrapper }}>{body!}</Curtains>
              </div>
            </>
          );
        }}
      </Flow>
    </section>
  );
};
