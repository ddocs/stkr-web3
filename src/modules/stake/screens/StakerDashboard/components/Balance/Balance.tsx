import * as React from 'react';
import { useBalanceStyles } from './BalanceStyles';
import { IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import { AEthIcon } from '../../../../../../UiKit/Icons/AEthIcon';
import { FEthIcon } from '../../../../../../UiKit/Icons/FEthIcon';
import { t, tHTML } from '../../../../../../common/utils/intl';
import { QuestionIcon } from '../../../../../../UiKit/Icons/QuestionIcon';
import BigNumber from 'bignumber.js';
import { DEFAULT_FIXED } from '../../../../../../common/const';

const ICONS = {
  aETH: <AEthIcon />,
  fETH: <FEthIcon />,
};

export interface IBalanceProps {
  variant: 'aETH' | 'fETH';
  value: BigNumber;
  price?: BigNumber;
}

const BALANCE_PRECISION = 4;
export const Balance = ({ variant, price, value }: IBalanceProps) => {
  const classes = useBalanceStyles();

  return (
    <Paper variant="outlined" square={false} className={classes.root}>
      <div className={classes.top}>
        <div className={classes.titleContainer}>
          <div className={classes.title}>
            <div className={classes.icon}>{ICONS[variant]}</div>
            {t(`balance.token-name.${variant}`)}
          </div>
          <Tooltip
            title={t(`balance.tip.${variant}`)}
            className={classes.tooltip}
          >
            <IconButton>
              <QuestionIcon size="xs" />
            </IconButton>
          </Tooltip>
        </div>

        {price ? (
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.price}
          >
            {t(`balance.price.${variant}`, {
              value: price.decimalPlaces(BALANCE_PRECISION).toNumber(),
            })}
          </Typography>
        ) : (
          <div />
        )}
      </div>

      <div className={classes.amount}>
        {tHTML(`balance.amount.${variant}`, {
          value: value.decimalPlaces(DEFAULT_FIXED).toNumber(),
        })}
      </div>
    </Paper>
  );
};
