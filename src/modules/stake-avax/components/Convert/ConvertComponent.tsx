import { Box, Grid, IconButton, Paper, Tooltip } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React from 'react';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import { AAvaxBIcon } from '../../../../UiKit/Icons/AAvaxBIcon';
import { QuestionIcon } from '../../../../UiKit/Icons/QuestionIcon';
import { BalanceTitle } from '../BalanceTitle';
import { BalanceValue } from '../BalanceValue';
import { useConvertStyles } from './useConvertStyles';

const ENABLED_UNSTAKE = false;

interface IConvertProps {
  amount?: BigNumber;
  isLoading?: boolean;
  onClick?: () => void;
}

export const ConvertComponent = ({
  amount,
  isLoading,
  onClick,
}: IConvertProps) => {
  const classes = useConvertStyles();

  return (
    <Paper variant="outlined" square={false} classes={{ root: classes.root }}>
      <BalanceTitle
        mb={6}
        title={t('stake-avax.dashboard.aavaxb-balance')}
        icon={<AAvaxBIcon />}
      />

      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm="auto">
          <BalanceValue amount={amount} currencyType={t('stake-avax.aavaxb')} />
        </Grid>

        <Grid item xs={12} sm>
          <Box display="flex" alignItems="center">
            <Tooltip title={t('coming-soon')}>
              <div>
                <Button
                  color="primary"
                  size="large"
                  className={classes.button}
                  disabled={isLoading || !ENABLED_UNSTAKE}
                  isLoading={isLoading}
                  onClick={onClick}
                >
                  {t('stake-avax.convert.convert')}
                </Button>
              </div>
            </Tooltip>

            {ENABLED_UNSTAKE && (
              <Tooltip title={t('stake-avax.convert.claim-summary')}>
                <IconButton>
                  <QuestionIcon size="xs" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
