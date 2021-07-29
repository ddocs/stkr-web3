import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { ReactNode } from 'react';
import { RouteProps } from 'react-router-dom';
import { useConnect } from '../../common/hooks/useConnect';
import { t } from '../../common/utils/intl';
import { INetwork } from '../../UiKit/GuardRoute';
import { NetworkSelector } from '../NetworkSelector';
import { useConnectStyles } from './useConnectStyles';

export interface IConnectProps extends RouteProps {
  networks: INetwork[];
  onConnectClick?: () => void;
  btnDisabled?: boolean;
  info?: ReactNode;
}

export const ConnectComponent = ({
  networks,
  onConnectClick,
  btnDisabled,
  info,
}: IConnectProps) => {
  const classes = useConnectStyles();
  return (
    <Paper variant="outlined" square={false} className={classes.root}>
      <div className={classes.headerContainer}>
        <Typography variant="h3">{t('connect.access-request')}</Typography>
      </div>

      <Typography className={classes.question}>
        {t('connect.ask-connect')}
      </Typography>

      <Button
        color="primary"
        size="large"
        fullWidth
        onClick={onConnectClick}
        className={classes.button}
        disabled={btnDisabled}
      >
        {t('connect.grant')}
      </Button>

      <Typography className={classes.info} color="textSecondary">
        {info || t('connect.info')}
      </Typography>

      <div className={classes.networksWrapper}>
        <Typography variant="h5" className={classes.networksTitle}>
          {t('connect.available-networks')}
        </Typography>

        <NetworkSelector networks={networks} />
      </div>
    </Paper>
  );
};

export const Connect = ({ networks }: Pick<IConnectProps, 'networks'>) => {
  const { dispatchConnect } = useConnect();

  return (
    <ConnectComponent networks={networks} onConnectClick={dispatchConnect} />
  );
};
