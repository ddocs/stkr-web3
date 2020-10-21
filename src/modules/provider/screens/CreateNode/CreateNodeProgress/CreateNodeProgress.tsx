import React from 'react';
import { useCreateNodeProgressStyles } from './CreateNodeProgressStyles';
import { Body2, Headline2 } from '../../../../../UiKit/Typography';
import { t, tHTML } from '../../../../../common/utils/intl';
import { ProgressBar } from '../../../components/ProgressBar/ProgressBar';
import { Icon } from './Icon';

export const CreateNodeProgress = () => {
  const classes = useCreateNodeProgressStyles();

  return (
    <div className={classes.component}>
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
