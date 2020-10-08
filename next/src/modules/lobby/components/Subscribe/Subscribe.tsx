import React from 'react';
import { useSubscribeStyles } from './SubscribeStyles';
import { Headline2 } from '../../../../UiKit/Typography';
import { useFlowControl } from '../../../../components/Flow/hooks';
import { isRequestInProgress } from '../../../../common/utils/requestStatus';
import { defineFlowStep } from '../../../../components/Flow/definition';
import { useTrackedOperation } from '../../../../common/hooks/useTrackedOperation';
import { apiPostEmail } from './utils';

import { SubscribeForm } from '../../../../components/SubscribeForm';
import { IEmailPayload } from '../../../../common/types';
import { t } from '../../../../common/utils/intl';

export const SubscribeComponent = ({
  onSubmit,
  disabled,
}: Pick<
  React.ComponentProps<typeof SubscribeForm>,
  'onSubmit' | 'disabled'
>) => {
  const classes = useSubscribeStyles();

  return (
    <div className={classes.component}>
      <Headline2 component="h2" className={classes.title}>
        Subscribe for our updates
      </Headline2>
      <SubscribeForm
        className={classes.form}
        buttonCaption={t('navigation.submit')}
        onSubmit={onSubmit}
        disabled={disabled}
        color="secondary"
      />
    </div>
  );
};

const SubscribeImp = () => {
  const { moveForward } = useFlowControl();

  const { submit, status } = useTrackedOperation(apiPostEmail, moveForward);

  const handleSubmit = (data: IEmailPayload) => {
    return submit(data);
  };

  return (
    <SubscribeComponent
      onSubmit={handleSubmit}
      disabled={isRequestInProgress(status)}
    />
  );
};

export const Subscribe = defineFlowStep({
  Body: SubscribeImp,
});
