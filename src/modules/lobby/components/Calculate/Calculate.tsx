import React, { useState } from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { t, tHTML } from '../../../../common/utils/intl';
import classNames from 'classnames';
import { useCalculateStyles } from './CalculateStyles';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { Button } from '../../../../UiKit/Button';
import { Divider, MuiThemeProvider, Slider, Typography, } from '@material-ui/core';
import { useAction } from '../../../../store/redux';
import { openUnlockWalletAction } from '../../../../store/modals/actions';
import { Headline1, Headline4, Headline6 } from '../../../../UiKit/Typography';
import { invertTheme } from '../../../../common/themes/invertTheme';
import BigNumber from 'bignumber.js';
import { YEAR_INTEREST } from "../../../../common/const";

const DEFAULT_VALUE = 10;
const FIXED_DECIMAL_PLACES = 2;

function EarningItem({
  title,
  amount,
  ratePrice,
}: {
  title: string;
  amount: number;
  ratePrice?: BigNumber;
}) {
  const classes = useCalculateStyles();

  return (
    <li className={classes.item}>
      <Headline6 className={classes.caption} component="span">
        {title}
      </Headline6>
      <Typography className={classes.value} component="div">
        <span className={classes.earningValue}>
          {t('units.eth', {
            value: new BigNumber(amount).toFormat(FIXED_DECIMAL_PLACES),
          })}
        </span>
        {ratePrice && (
          <>
            <Divider orientation="vertical" className={classes.divider} />
            <span className={classes.earningConvertedValue}>
              {t('units.$', {
                value: ratePrice
                  .multipliedBy(amount)
                  .toFormat(FIXED_DECIMAL_PLACES),
              })}
            </span>
          </>
        )}
      </Typography>
    </li>
  );
}

interface ICalculateProps {
  className?: string;
  ethPrice?: BigNumber;
  isConnected: boolean;
}

export const Calculate = ({
  className,
  ethPrice,
  isConnected,
}: ICalculateProps) => {
  const classes = useCalculateStyles();
  const openUnlockWallet = useAction(openUnlockWalletAction);

  const [value, setValue] = useState<number>(DEFAULT_VALUE);

  const handleSliderChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <MuiThemeProvider theme={invertTheme}>
      <section className={classNames(classes.component, className)}>
        <Curtains className={classes.curtains}>
          <Headline1 align="center" className={classes.title}>
            {tHTML('about.calculate-title')}
          </Headline1>
          <BackgroundColorProvider className={classes.form}>
            <Headline4 className={classes.label} component="p">
              <span className={classes.captionPrice}>
                {t('about.calculate-note')}
              </span>
              <span className={classes.ethPrice}>
                {t('units.eth', { value })}
              </span>
              <span className={classes.usdPrice}>
                {ethPrice &&
                  t('units.$', { value: ethPrice.multipliedBy(value) })}
              </span>
            </Headline4>
            <Slider
              className={classes.range}
              value={value}
              onChange={handleSliderChange}
              aria-labelledby="calculator"
              step={0.5}
              min={0}
            />
            <ul className={classes.list}>
              <EarningItem
                title={t('about.monthly')}
                amount={(value * YEAR_INTEREST) / 12}
                ratePrice={ethPrice}
              />
              <EarningItem
                title={t('about.yearly')}
                amount={value * YEAR_INTEREST}
                ratePrice={ethPrice}
              />
            </ul>
            {!isConnected && (
              <Button
                className={classes.unlock}
                onClick={openUnlockWallet}
                color="primary"
                size="large"
              >
                {t('navigation.unlock-your-wallet')}
              </Button>
            )}
          </BackgroundColorProvider>
        </Curtains>
      </section>
    </MuiThemeProvider>
  );
};
