import { Box } from '@material-ui/core';
import React from 'react';
import { t } from '../../../../common/utils/intl';
import { Headline4 } from '../../../../UiKit/Typography';
import { BigButton } from '../BigButton';
import { BridgeBox } from '../BridgeBox';
import { useAvailableStyles } from './AvailableStyles';

interface IAvailableProps {
  value: string | number;
  network: string;
  onClaimClick: () => void;
  onRepeatClick?: () => void;
  isLoading?: boolean;
  done?: boolean;
  onCloseClick?: () => void;
}

export const Available = ({
  value,
  network,
  onClaimClick,
  onRepeatClick,
  isLoading = false,
  done = false,
  onCloseClick,
}: IAvailableProps) => {
  const classes = useAvailableStyles();

  return (
    <BridgeBox onCloseClick={onCloseClick} className={classes.root}>
      <Headline4 className={classes.title}>
        {done
          ? t('cross-chain-bridge.available.success-title')
          : t('cross-chain-bridge.available.title', {
              value,
              network,
            })}
      </Headline4>

      <Box textAlign="center" mt={7.5}>
        {done ? (
          <BigButton onClick={onRepeatClick}>
            {t('cross-chain-bridge.available.btn-finish')}
          </BigButton>
        ) : (
          <BigButton
            onClick={onClaimClick}
            isLoading={isLoading}
            disabled={isLoading}
          >
            {t('cross-chain-bridge.available.btn-claim')}
          </BigButton>
        )}
      </Box>
    </BridgeBox>
  );
};
