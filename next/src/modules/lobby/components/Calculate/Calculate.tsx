import React from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { tHTML, t } from '../../../../common/utils/intl';
import classNames from 'classnames';
import { useCalculateStyles } from './CalculateStyles';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { Button } from '../../../../UiKit/Button';

interface IPromoProps {
  className?: string;
}

const savers = ['Monthly Earning', 'Yearly Earning'];

export const Calculate = ({ className }: IPromoProps) => {
  const classes = useCalculateStyles();

  return (
    <section className={classNames(classes.component, className)}>
      <Curtains className={classes.wrapper}>
        <h2 className={classes.title}>{tHTML('about.title')}</h2>
        <BackgroundColorProvider>
          <input type="range" />
          <ul>
            {savers.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Button>{t('navigation.unlock-your-wallet')}</Button>
        </BackgroundColorProvider>
      </Curtains>
    </section>
  );
};
