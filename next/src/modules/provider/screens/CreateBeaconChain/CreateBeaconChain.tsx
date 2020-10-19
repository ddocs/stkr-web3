import React, { useState } from 'react';
import { useCreateBeaconChainStyles } from './CreateBeaconChainStyles';
import { uid } from 'react-uid';
import { Flow } from '../../../../components/Flow';
import { defineFlow } from '../../../../components/Flow/definition';
import { CreateBeaconChainStage1 } from '../../components/CreateBeaconChainStage1';
import classNames from 'classnames';
import { Curtains } from '../../../../UiKit/Curtains';
import { CreateBeaconChainStage2 } from '../../components/CreateBeaconChainStage2';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { useAction } from '../../../../store/redux';
import { UserActions } from '../../../../store/actions/UserActions';

interface ICreateBeaconChainProps {
  className?: string;
}

const STEPS = defineFlow(CreateBeaconChainStage1, CreateBeaconChainStage2);

export const CreateBeaconChain = ({ className }: ICreateBeaconChainProps) => {
  const classes = useCreateBeaconChainStyles();

  const [steps] = useState(STEPS);

  const dispatchFetchCurrentProviderSidecars = useAction(
    UserActions.fetchCurrentProviderSidecars,
  );

  return (
    <section className={classNames(classes.component, className)}>
      <Flow
        key={uid(steps)}
        steps={steps}
        onComplete={dispatchFetchCurrentProviderSidecars}
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
