import React, { useState } from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { tHTML, t } from '../../../../common/utils/intl';
import classNames from 'classnames';
import { useCalculateStyles } from './CalculateStyles';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { Button } from '../../../../UiKit/Button';
import { Slider } from '@material-ui/core';
import { useAction } from '../../../../store/redux';
import { openUnlockWalletAction } from '../../../../store/modals/actions';
import { Body1 } from '../../../../UiKit/Typography';

interface IPromoProps {
  className?: string;
  isAuthenticated: boolean;
}

const savers = ['monthly', 'yearly'];

export const Calculate = ({ className, isAuthenticated }: IPromoProps) => {
  const classes = useCalculateStyles();

  const openUnlockWallet = useAction(openUnlockWalletAction);

  const defaultValue = 10;

  const [value, setValue] = useState<number>(defaultValue);

  const handleSliderChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <section className={classNames(classes.component, className)}>
      <Curtains className={classes.wrapper}>
        <h2 className={classes.title}>{tHTML('about.calculate-title')}</h2>
        <BackgroundColorProvider className={classes.form}>
          <Body1 className={classes.label} component="p">
            {t('about.calculate-note')}
            <span>{`${value} ETH`}</span>
          </Body1>
          <Slider
            className={classes.range}
            value={value}
            onChange={handleSliderChange}
            aria-labelledby="calculator"
            step={0.5}
            min={0}
          />
          <ul className={classes.list}>
            {savers.map(item => {
              const monthlySaver = (value * 1.2).toFixed(2);
              const yearlySaver = (value * 10).toFixed(2);
              return (
                <li key={item} className={classes.item}>
                  <Body1 className={classes.caption} component="span">
                    {t(`about.${item}`)}
                  </Body1>
                  <span className={classes.value}>{`${value} ETH`}</span>
                  {`$${item === 'monthly' ? monthlySaver : yearlySaver}`}
                </li>
              );
            })}
          </ul>
        </BackgroundColorProvider>
        {!isAuthenticated && (
          <Button
            className={classes.unlock}
            onClick={openUnlockWallet}
            color="primary"
            size="large"
          >
            {t('navigation.unlock-your-wallet')}
          </Button>
        )}
      </Curtains>
    </section>
  );
};
