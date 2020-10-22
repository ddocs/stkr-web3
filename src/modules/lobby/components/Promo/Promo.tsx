import React from 'react';
import { usePromoStyles } from './PromoStyles';
import { Curtains } from '../../../../UiKit/Curtains';
import { Body1, Headline1 } from '../../../../UiKit/Typography';
import { t, tHTML } from '../../../../common/utils/intl';
import classNames from 'classnames';
import { Info } from '../../../../components/Info';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';

interface IPromoProps {
  className?: string;
}

const LIST = [
  {
    caption: 'about.total',
    value: '$1,233,234',
  },
  {
    caption: 'about.providers',
    value: '342',
  },
  {
    caption: 'about.stakers',
    value: '2500',
  },
];

export const Promo = ({ className }: IPromoProps) => {
  const classes = usePromoStyles();

  return (
    <section className={classNames(classes.component, className)}>
      <Curtains classes={{ root: classes.wrapper }}>
        <h2 className={classes.title}>{tHTML('about.title')}</h2>
        <Body1 className={classes.text} component="p">
          {t('about.text')}
        </Body1>
        <Info className={classes.info} data={LIST} />
        <BackgroundColorProvider className={classes.whatIs}>
          <Headline1 className={classes.caption} component="h3">
            {tHTML('what-is.title')}
          </Headline1>
          <Body1 className={classes.note} component="p">
            {t('what-is.note1')}
          </Body1>
          <Body1 className={classes.note} component="p" color="textSecondary">
            {t('what-is.note2')}
          </Body1>
        </BackgroundColorProvider>
      </Curtains>
    </section>
  );
};
