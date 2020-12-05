import React, { useCallback, useState } from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { t, tHTML } from '../../../../common/utils/intl';
import classNames from 'classnames';
import { useCalculateStyles } from './CalculateStyles';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { Button } from '../../../../UiKit/Button';
import { Slider } from '@material-ui/core';
import { Headline1, Headline5 } from '../../../../UiKit/Typography';
import BigNumber from 'bignumber.js';
import { YEAR_INTEREST } from '../../../../common/const';
import { UserActions } from '../../../../store/actions/UserActions';
import { useDispatch } from 'react-redux';

const DEFAULT_VALUE = 10;
const FIXED_DECIMAL_PLACES = 2;

const Value = ({
  title,
  value,
  ratePrice,
}: {
  title: string;
  value: number;
  ratePrice?: BigNumber;
}) => {
  const classes = useCalculateStyles();

  return (
    <div className={classes.item}>
      <Headline5 className={classes.itemCaption} component="span">
        {title}
      </Headline5>
      <span className={classes.itemValue}>
        {t('units.eth', {
          value: new BigNumber(value).toFormat(FIXED_DECIMAL_PLACES),
        })}
      </span>
      {ratePrice && (
        <span className={classes.itemConvertedValue}>
          {t('units.$', {
            value: ratePrice.multipliedBy(value).toFormat(FIXED_DECIMAL_PLACES),
          })}
        </span>
      )}
    </div>
  );
};

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
  const dispatch = useDispatch();
  const handleUnlockWallet = useCallback(() => {
    dispatch(UserActions.connect());
  }, [dispatch]);

  const [value, setValue] = useState<number>(DEFAULT_VALUE);

  const handleSliderChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <section className={classNames(classes.component, className)}>
      <Curtains classes={{ root: classes.wrapper }}>
        <BackgroundColorProvider component="div" className={classes.content}>
          <Headline1 className={classes.title} component="h2">
            {tHTML('calculate.title')}
          </Headline1>
          <div className={classes.form}>
            <Slider
              className={classes.range}
              value={value}
              onChange={handleSliderChange}
              aria-labelledby="calculator"
              step={0.5}
              min={0}
              max={320}
            />
            <Value
              title={t('calculate.note')}
              value={value}
              ratePrice={ethPrice}
            />
            <Value
              title={t('calculate.yearly')}
              value={value * YEAR_INTEREST}
              ratePrice={ethPrice}
            />
            {!isConnected && (
              <Button
                className={classes.unlock}
                onClick={handleUnlockWallet}
                color="primary"
                size="large"
              >
                {t('navigation.unlock-your-wallet')}
              </Button>
            )}
          </div>
        </BackgroundColorProvider>
      </Curtains>
    </section>
  );
};
