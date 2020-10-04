import * as React from 'react';
import { usePromoStyles } from './PromoStyles';
import { Curtains } from '../../../../UiKit/Curtains';
import { Headline1 } from '../../../../UiKit/Typography';
import { tHTML, t } from '../../../../common/utils/intl';
import classNames from 'classnames';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';

interface IPromoProps {
  className?: string;
}

export const Promo = ({ className }: IPromoProps) => {
  const LIST: Record<string, string> = {
    distributed: '200k',
    providers: '25',
    total: '2500',
  };

  const keys = Object.keys(LIST);

  const classes = usePromoStyles({ count: keys.length });

  return (
    <section className={classNames(classes.component, className)}>
      <Curtains className={classes.wrapper}>
        <h2 className={classes.title}>{tHTML('about.title')}</h2>
        <p className={classes.text}>{t('about.text')}</p>
        <ul className={classes.list}>
          {keys.map(key => {
            const item = LIST[key];
            return (
              <BackgroundColorProvider
                key={key}
                className={classes.item}
                component="li"
              >
                {t(`about.${key}`)}
                <Headline1
                  className={classes.value}
                  component="span"
                  color="primary"
                >
                  {item}
                </Headline1>
              </BackgroundColorProvider>
            );
          })}
        </ul>
      </Curtains>
    </section>
  );
};
