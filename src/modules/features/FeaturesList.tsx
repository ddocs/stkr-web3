import React, { ReactNode } from 'react';
import { Curtains } from '../../UiKit/Curtains';
import { useFeaturesListStyles } from './FeaturesListStyles';
import { Box, Button, Paper, Tooltip, Typography } from '@material-ui/core';
import { ReactComponent as StakeEthIcon } from './assets/stake-eth.svg';
import { ReactComponent as StakeBnbIcon } from './assets/stake-bnb.svg';
import { ReactComponent as ProviderIcon } from './assets/provider.svg';
import { t, tHTML } from '../../common/utils/intl';
import { useFeaturesAvailable } from '../../common/hooks/useFeaturesAvailable';
import { Link as RouterLink } from 'react-router-dom';
import {
  PROVIDER_MAIN_PATH,
  STAKER_BNB_PATH,
  STAKER_DASHBOARD_PATH,
} from '../../common/const';

interface IListItemProps {
  children: ReactNode;
}

function ListItem({ children }: IListItemProps) {
  const classes = useFeaturesListStyles();

  return (
    <Typography
      variant="body2"
      color="textSecondary"
      className={classes.listItem}
    >
      {children}
    </Typography>
  );
}

interface IHeaderProps {
  children: ReactNode;
}

function Header({ children }: IHeaderProps) {
  return (
    <Box mb={3}>
      <Typography variant="h4">{children}</Typography>
    </Box>
  );
}

export const FeaturesList = () => {
  const classes = useFeaturesListStyles();
  const { isProviderAvailable, isBnbStakingAvailable } = useFeaturesAvailable();

  return (
    <Box component="section" mt={8}>
      <Curtains className={classes.content}>
        <Paper variant="outlined" square={false} className={classes.paper}>
          <StakeEthIcon className={classes.icon} />
          <div>
            <Header>{t('features-list.header.stake-eth')}</Header>
            <ListItem>{t('features-list.list-item.stake-eth.1')}</ListItem>
            <ListItem>{t('features-list.list-item.stake-eth.2')}</ListItem>
            <ListItem>{t('features-list.list-item.stake-eth.3')}</ListItem>
          </div>
          <div className={classes.actions}>
            <Button
              variant="contained"
              color="primary"
              className={classes.action}
              fullWidth={true}
              component={RouterLink}
              to={STAKER_DASHBOARD_PATH}
            >
              {t('features-list.action.stake-eth.mainnet')}
            </Button>
          </div>
        </Paper>

        <Paper variant="outlined" square={false} className={classes.paper}>
          <StakeBnbIcon className={classes.icon} />
          <div>
            <Header>{t('features-list.header.stake-bnb')}</Header>
            <ListItem>{t('features-list.list-item.stake-bnb.1')}</ListItem>
            <ListItem>{t('features-list.list-item.stake-bnb.2')}</ListItem>
            <ListItem>{t('features-list.list-item.stake-bnb.3')}</ListItem>
          </div>
          <div className={classes.actions}>
            <Tooltip
              title={tHTML('features-list.binance-wallet-required')}
              disableHoverListener={isBnbStakingAvailable}
              disableTouchListener={isBnbStakingAvailable}
              interactive={true}
            >
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.action}
                  fullWidth={true}
                  component={RouterLink}
                  to={STAKER_BNB_PATH}
                  disabled={!isBnbStakingAvailable}
                >
                  {t('features-list.action.stake-bnb')}
                </Button>
              </div>
            </Tooltip>
          </div>
        </Paper>

        <Paper variant="outlined" square={false} className={classes.paper}>
          <ProviderIcon className={classes.icon} />
          <div>
            <Header>{t('features-list.header.provider')}</Header>
            <ListItem>{t('features-list.list-item.provider.1')}</ListItem>
            <ListItem>{t('features-list.list-item.provider.2')}</ListItem>
            <ListItem>{t('features-list.list-item.provider.3')}</ListItem>
          </div>
          <div className={classes.actions}>
            <Button
              variant="contained"
              color="primary"
              className={classes.action}
              fullWidth={true}
              disabled={!isProviderAvailable}
              component={RouterLink}
              to={PROVIDER_MAIN_PATH}
            >
              {t('features-list.action.provider')}
            </Button>
          </div>
        </Paper>
      </Curtains>
    </Box>
  );
};
