import React from 'react';
import { usePromoStyles } from './PromoStyles';
import { Curtains } from '../../../../UiKit/Curtains';
import { Body1 } from '../../../../UiKit/Typography';
import { t, tHTML } from '../../../../common/utils/intl';
import classNames from 'classnames';
import { Info } from '../../../../components/Info';

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
  const classes = usePromoStyles({ count: LIST.length });

  return (
    <section className={classNames(classes.component, className)}>
      <Curtains classes={{ root: classes.wrapper }}>
        <h2 className={classes.title}>{tHTML('about.title')}</h2>
        <Body1 className={classes.text} component="p">
          {t('about.text')}
        </Body1>
        <Info className={classes.info} data={LIST} />
      </Curtains>
    </section>
  );
};
