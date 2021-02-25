import { Slider } from '@material-ui/core';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { STAKER_RATE } from '../../../../common/const';
import { t, tHTML } from '../../../../common/utils/intl';
import { useAuthentication } from '../../../../common/utils/useAuthentications';
import { QueryLoadingCentered } from '../../../../components/QueryLoading/QueryLoading';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { IGlobalStats } from '../../../../store/apiMappers/globalStatsApi';
import { Button } from '../../../../UiKit/Button';
import { Curtains } from '../../../../UiKit/Curtains';
import { Headline1, Headline5 } from '../../../../UiKit/Typography';
import { useCalculateStyles } from './CalculateStyles';

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
        {t('unit.eth-value', {
          value: new BigNumber(value)
            .decimalPlaces(FIXED_DECIMAL_PLACES)
            .toFormat(),
        })}
      </span>
      {ratePrice && (
        <span className={classes.itemConvertedValue}>
          {t('unit.$-value', {
            value: ratePrice
              .multipliedBy(value)
              .decimalPlaces(FIXED_DECIMAL_PLACES),
          })}
        </span>
      )}
    </div>
  );
};

interface ICalculateComponentProps {
  isConnected: boolean;
  isLoading?: boolean;
  onUnlockWalletClick: () => void;
  ethPrice: BigNumber;
  currentApr: number;
}

export const CalculateComponent = ({
  ethPrice,
  currentApr,
  isConnected,
  isLoading = false,
  onUnlockWalletClick,
}: ICalculateComponentProps) => {
  const classes = useCalculateStyles();
  const [value, setValue] = useState<number>(DEFAULT_VALUE);

  const handleSliderChange = (_event: any, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const yearlyEarning = value * currentApr * STAKER_RATE;

  const renderedLoader = (
    <div className={classNames(classes.content, classes.contentLoader)}>
      <QueryLoadingCentered />
    </div>
  );

  const renderedForm = (
    <div className={classNames(classes.content, classes.contentForm)}>
      <Slider
        className={classes.range}
        value={value}
        onChange={handleSliderChange}
        aria-labelledby="calculator"
        step={0.5}
        min={0}
        max={320}
      />

      <Value title={t('calculate.note')} value={value} ratePrice={ethPrice} />

      <Value
        title={t('calculate.yearly')}
        value={yearlyEarning}
        ratePrice={ethPrice}
      />

      {!isConnected && (
        <Button
          className={classes.unlock}
          onClick={onUnlockWalletClick}
          color="primary"
          size="large"
        >
          {t('navigation.unlock-your-wallet')}
        </Button>
      )}
    </div>
  );

  return (
    <section>
      <Curtains classes={{ root: classes.wrapper }}>
        <div className={classes.box}>
          <Headline1 className={classes.title} component="h2">
            {tHTML('calculate.title')}
          </Headline1>

          {isLoading ? renderedLoader : renderedForm}
        </div>
      </Curtains>
    </section>
  );
};

export const Calculate = () => {
  const { isConnected } = useAuthentication();
  const dispatch = useDispatch();

  const onUnlockWalletClick = useCallback(() => {
    dispatch(UserActions.connect());
  }, [dispatch]);

  const { data: globalStats, error, loading } = useQuery<IGlobalStats | null>({
    type: UserActionTypes.FETCH_GLOBAL_STATS,
  });

  const ethPrice = new BigNumber(globalStats?.ethereumPrice || 0);
  const currentApr = globalStats?.currentApr || 0;

  return error ? null : (
    <CalculateComponent
      isLoading={loading}
      ethPrice={ethPrice}
      currentApr={currentApr}
      isConnected={isConnected}
      onUnlockWalletClick={onUnlockWalletClick}
    />
  );
};
