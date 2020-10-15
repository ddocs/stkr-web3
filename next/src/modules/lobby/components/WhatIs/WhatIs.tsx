import React from 'react';
import { useWhatIsStyles } from './WhatIsStyles';
import { tHTML, t } from '../../../../common/utils/intl';
import { Curtains } from '../../../../UiKit/Curtains';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { Body1, Headline1 } from '../../../../UiKit/Typography';

export const WhatIs = () => {
  const classes = useWhatIsStyles();

  return (
    <Curtains className={classes.root}>
      <BackgroundColorProvider className={classes.content}>
        <div>
          <Headline1>{tHTML('what-is.title')}</Headline1>
        </div>
        <div>
          <Body1 className={classes.note}>{t('what-is.note1')}</Body1>
          <Body1 color="textSecondary">{t('what-is.note2')}</Body1>
        </div>
      </BackgroundColorProvider>
    </Curtains>
  );
};
