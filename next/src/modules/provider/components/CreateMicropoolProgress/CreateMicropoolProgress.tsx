import React from 'react';
import { useCreateMicropoolProgressStyles } from './CreateMicropoolProgressStyles';
import { Body2, Headline2 } from '../../../../UiKit/Typography';
import { t, tHTML } from '../../../../common/utils/intl';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { Icon } from '../CreateBeaconChainStage2/Icon';

export const CreateMicropoolProgress = () => {
  const classes = useCreateMicropoolProgressStyles();

  return (
    <div className={classes.component}>
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
