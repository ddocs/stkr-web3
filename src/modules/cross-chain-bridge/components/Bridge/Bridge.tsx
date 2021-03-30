import { Box, Grid, IconButton } from '@material-ui/core';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { t } from '../../../../common/utils/intl';
import { Body1, Headline2 } from '../../../../UiKit/Typography';
import { BigButton } from '../BigButton';
import { BlockchainPanel, IBlockchainPanelProps } from '../BlockchainPanel';
import { BridgeBox } from '../BridgeBox';
import { ReactComponent as SwapIcon } from './assets/swap.svg';
import { useBridgeStyles } from './BridgeStyles';

export interface IBridgeProps {
  onConnectClick: () => void;
  onSwapClick: () => void;
  isToEth?: boolean;
  isConnected?: boolean;
  form?: JSX.Element;
  onAssetChange?: (value: string) => void;
}

export const Bridge = ({
  onSwapClick,
  onConnectClick,
  isToEth,
  isConnected,
  form,
  onAssetChange,
}: IBridgeProps) => {
  const classes = useBridgeStyles();
  const isToBinance = !isToEth;

  const handleSwapClick = isConnected ? undefined : onSwapClick;

  const assetItems: IBlockchainPanelProps['dropdownItems'] = useMemo(
    () => [
      {
        label: t('unit.aeth'),
        value: 'aETH',
        icon: 'aEth',
      },
      {
        label: t('unit.feth'),
        value: 'fETH',
        icon: 'fEth',
      },
    ],
    [],
  );

  return (
    <BridgeBox>
      <Headline2 className={classes.title}>
        {t('cross-chain-bridge.title')}
      </Headline2>

      <Box mb={3}>
        <Grid container spacing={2} alignItems="center">
          <Grid
            item
            xs={12}
            sm
            className={classNames({
              [classes.providerFrom]: isToBinance,
              [classes.providerTo]: isToEth,
            })}
          >
            <BlockchainPanel
              icon="eth"
              title={t('cross-chain-bridge.chain-ehthereum')}
              subTitle={
                isToBinance
                  ? t('cross-chain-bridge.from')
                  : t('cross-chain-bridge.to')
              }
              onClick={handleSwapClick}
              disabled={isConnected}
            />
          </Grid>

          <Grid item xs={12} sm="auto">
            <Box textAlign="center">
              <IconButton
                className={classNames(
                  classes.swapBtn,
                  !isConnected && classes.swapBtnClickable,
                )}
                aria-label="swap"
                title="Click to change"
                onClick={handleSwapClick}
                disabled={isConnected}
              >
                <SwapIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm
            className={classNames({
              [classes.providerFrom]: isToEth,
              [classes.providerTo]: isToBinance,
            })}
          >
            <BlockchainPanel
              icon="binance"
              title={t('cross-chain-bridge.chain-binance')}
              subTitle={
                isToEth
                  ? t('cross-chain-bridge.from')
                  : t('cross-chain-bridge.to')
              }
              onClick={handleSwapClick}
              disabled={isConnected}
            />
          </Grid>
        </Grid>
      </Box>

      <Box mb={4.5}>
        <Box mb={2}>
          <Body1 color="textSecondary">{t('cross-chain-bridge.asset')}</Body1>
        </Box>

        <BlockchainPanel
          icon={assetItems[0].icon}
          title={assetItems[0].label}
          dropdownItems={assetItems}
          onChange={onAssetChange}
          disabled={isConnected}
        />
      </Box>

      {isConnected ? (
        <>{form}</>
      ) : (
        <Box textAlign="center" mt={7.5}>
          <BigButton onClick={onConnectClick}>
            {t('cross-chain-bridge.connect-btn')}
          </BigButton>
        </Box>
      )}
    </BridgeBox>
  );
};
