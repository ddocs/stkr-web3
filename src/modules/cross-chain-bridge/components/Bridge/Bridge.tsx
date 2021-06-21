import { Box, Grid, IconButton, Typography } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Blockchain } from '../../../../common/types';
import { t } from '../../../../common/utils/intl';
import { Body1, Headline2 } from '../../../../UiKit/Typography';
import { BlockchainIcons, blockchainsMap } from '../../const';
import { BigButton } from '../BigButton';
import { BlockchainPanel } from '../BlockchainPanel';
import { BridgeBox } from '../BridgeBox';
import { ReactComponent as SwapIcon } from './assets/swap.svg';
import { useBridgeStyles } from './BridgeStyles';

export interface IBridgeProps {
  onConnectClick?: () => void;
  onSwapClick: () => void;
  fromBlockchain: Blockchain;
  toBlockchain: Blockchain;
  isConnected?: boolean;
  form?: JSX.Element;
  onAssetChange?: (value: string) => void;
  disabled?: boolean;
  recoveryLink?: string;
  onCloseClick?: () => void;
  title?: string;
}

export const Bridge = ({
  onSwapClick,
  onConnectClick,
  fromBlockchain,
  toBlockchain,
  isConnected,
  form,
  onAssetChange,
  disabled = false,
  recoveryLink,
  onCloseClick,
  title,
}: IBridgeProps) => {
  const classes = useBridgeStyles();

  return (
    <>
      <BridgeBox onCloseClick={onCloseClick}>
        <Headline2 className={classes.title}>
          {title || t('cross-chain-bridge.title')}
        </Headline2>

        <Box mb={3}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm>
              <BlockchainPanel
                icon={blockchainsMap[fromBlockchain].icon}
                title={blockchainsMap[fromBlockchain].title}
                subTitle={t('cross-chain-bridge.from')}
                onClick={onSwapClick}
                disabled={disabled}
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
                  title={t('cross-chain-bridge.swap-title')}
                  onClick={onSwapClick}
                  disabled={disabled}
                >
                  <SwapIcon />
                </IconButton>
              </Box>
            </Grid>

            <Grid item xs={12} sm>
              <BlockchainPanel
                icon={blockchainsMap[toBlockchain].icon}
                title={blockchainsMap[toBlockchain].title}
                subTitle={t('cross-chain-bridge.to')}
                onClick={onSwapClick}
                disabled={disabled}
              />
            </Grid>
          </Grid>
        </Box>

        <Box mb={4.5}>
          <Box mb={2}>
            <Body1 color="textSecondary">{t('cross-chain-bridge.asset')}</Body1>
          </Box>

          <BlockchainPanel
            icon={BlockchainIcons.aEth}
            title="aETHc"
            onChange={onAssetChange}
            disabled
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

      {recoveryLink && (
        <Box textAlign="center" mt={5}>
          <Typography variant="body2" color="textSecondary">
            {`${t('cross-chain-bridge.recovery-notification')} `}
            <Link to={recoveryLink}>{t('cross-chain-bridge.link')}</Link>.
          </Typography>
        </Box>
      )}
    </>
  );
};
