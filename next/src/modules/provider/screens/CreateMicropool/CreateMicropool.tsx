import React, { useState } from 'react';
import { useCreateBeaconChainStyles } from './CreateMicropoolStyles';
import { uid } from 'react-uid';
import { Flow } from '../../../../components/Flow';
import { defineFlow } from '../../../../components/Flow/definition';
import classNames from 'classnames';
import { Curtains } from '../../../../UiKit/Curtains';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { CreateMicropoolStage1 } from '../../components/CreateMicropoolStage1';
import { CreateMicropoolStage2 } from '../../components/CreateMicropoolStage2';
import { useAction } from '../../../../store/redux';
import { UserActions } from '../../../../store/actions/UserActions';

interface ICreateMicropoolProps {
  className?: string;
}

const STEPS = defineFlow(CreateMicropoolStage1, CreateMicropoolStage2);

export const CreateMicropool = ({ className }: ICreateMicropoolProps) => {
  const classes = useCreateBeaconChainStyles();

  const [steps] = useState(STEPS);

  const dispatchFetchCurrentProviderMicropools = useAction(
    UserActions.fetchCurrentProviderMicropools,
  );

  return (
    <section className={classNames(classes.component, className)}>
      <Flow
        key={uid(steps)}
        steps={steps}
        onComplete={dispatchFetchCurrentProviderMicropools}
      >
        {body => {
          return (
            <Curtains classes={{ root: classes.wrapper }}>
              <BackgroundColorProvider className={classes.content}>
                {body!}
              </BackgroundColorProvider>
            </Curtains>
          );
        }}
      </Flow>
    </section>
  );
};
