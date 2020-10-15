import React from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { t } from '../../../../common/utils/intl';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { Headline1, Headline4, SmallTitle } from '../../../../UiKit/Typography';
import { useStayTunedStyles } from './StayTunedStyles';
import { ReactComponent as BoxImage } from './assets/box.svg';
import { ReactComponent as SmallBoxImage } from './assets/smallBox.svg';
import { Box } from '@material-ui/core';
import { Headline5 } from '../../../../UiKit/Typography/Typography';

interface IStayTunedProps {
  className?: string;
}

export const StayTuned = ({ className }: IStayTunedProps) => {
  const classes = useStayTunedStyles();
  return (
    <section className={className}>
      <Curtains>
        <Headline1 align="center" className={classes.title}>
          {t('stay-tuned.title')}
        </Headline1>
        <div className={classes.content}>
          <Box
            component={BackgroundColorProvider}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <BoxImage className={classes.mainNewsImage} />
            <Headline4 align="center" className={classes.mainNewsHeader}>
              {t('stay-tuned.subheader.1')}
            </Headline4>

            <SmallTitle color="textSecondary">
              {t('stay-tuned.date.1')}
            </SmallTitle>
          </Box>
          <BackgroundColorProvider className={classes.secondaryNewsItem}>
            <SmallBoxImage className={classes.secondaryNewsImage} />
            <div>
              <Headline5 className={classes.secondaryNewsHeader}>
                {t('stay-tuned.subheader.2')}
              </Headline5>
              <SmallTitle color="textSecondary">
                {t('stay-tuned.date.1')}
              </SmallTitle>
            </div>
          </BackgroundColorProvider>
          <BackgroundColorProvider className={classes.secondaryNewsItem}>
            <SmallBoxImage className={classes.secondaryNewsImage} />
            <div>
              <Headline5 className={classes.secondaryNewsHeader}>
                {t('stay-tuned.subheader.3')}
              </Headline5>
              <SmallTitle color="textSecondary">
                {t('stay-tuned.date.3')}
              </SmallTitle>
            </div>
          </BackgroundColorProvider>
        </div>
      </Curtains>
    </section>
  );
};
