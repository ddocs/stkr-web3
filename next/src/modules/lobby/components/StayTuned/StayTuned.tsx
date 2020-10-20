import React from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { t } from '../../../../common/utils/intl';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { Headline1, SmallTitle, Headline6 } from '../../../../UiKit/Typography';
import { useStayTunedStyles } from './StayTunedStyles';
import { ReactComponent as BoxImage } from './assets/box.svg';
import classNames from 'classnames';

interface IStayTunedProps {
  className?: string;
}

export const StayTuned = ({ className }: IStayTunedProps) => {
  const classes = useStayTunedStyles();
  return (
    <section className={classNames(classes.component, className)}>
      <Curtains classes={{ root: classes.wrapper }}>
        <Headline1 align="center" className={classes.title} component="h2">
          {t('stay-tuned.title')}
        </Headline1>
        <ul className={classes.content}>
          <BackgroundColorProvider
            className={classNames(classes.newsItem, classes.mainNewsItem)}
            component="li"
          >
            <BoxImage
              className={classNames(classes.newsImage, classes.mainNewsImage)}
            />
            <Headline6
              classes={{
                root: classNames(classes.newsHeader, classes.mainNewsHeader),
              }}
              component="h3"
            >
              {t('stay-tuned.subheader.1')}
            </Headline6>
            <SmallTitle
              classes={{
                root: classNames(classes.newsText, classes.mainNewsText),
              }}
              color="textSecondary"
              component="p"
            >
              {t('stay-tuned.date.1')}
            </SmallTitle>
          </BackgroundColorProvider>
          <BackgroundColorProvider className={classes.newsItem} component="li">
            <BoxImage className={classes.newsImage} />
            <Headline6 classes={{ root: classes.newsHeader }} component="h3">
              {t('stay-tuned.subheader.2')}
            </Headline6>
            <SmallTitle
              classes={{ root: classes.newsText }}
              color="textSecondary"
              component="p"
            >
              {t('stay-tuned.date.1')}
            </SmallTitle>
          </BackgroundColorProvider>
          <BackgroundColorProvider className={classes.newsItem} component="li">
            <BoxImage className={classes.newsImage} />
            <Headline6 classes={{ root: classes.newsHeader }} component="h3">
              {t('stay-tuned.subheader.3')}
            </Headline6>
            <SmallTitle
              classes={{ root: classes.newsText }}
              color="textSecondary"
              component="p"
            >
              {t('stay-tuned.date.3')}
            </SmallTitle>
          </BackgroundColorProvider>
        </ul>
      </Curtains>
    </section>
  );
};
