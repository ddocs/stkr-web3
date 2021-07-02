import React, { useCallback } from 'react';
import { RouteProps } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { fade, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { t } from '../../common/utils/intl';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { UserActions } from '../../store/actions/UserActions';
import { NetworkSelector } from '../NetworkSelector/NetworkSelector';
import { INetwork } from '../../UiKit/GuardRoute';
import { Headline5 } from '../../UiKit/Typography';

interface IConnectProps extends RouteProps {
  networks: INetwork[];
}

const useConnectStyles = makeStyles<Theme>(theme => {
  return {
    root: {
      width: 580,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: theme.spacing(15, 'auto'),
      padding: '60px 0',
      [theme.breakpoints.down('sm')]: {
        width: 'unset',
        margin: theme.spacing(15, 10),
      },
    },
    headerContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    question: {
      margin: theme.spacing(3),
      fontSize: 16,
    },
    button: {
      maxWidth: 262,
      width: '100%',
      height: 52,
      margin: theme.spacing(4, 4, 0),
      [theme.breakpoints.down('xs')]: {
        maxWidth: 'none',
      },
    },
    info: {
      margin: theme.spacing(3),
      fontSize: 16,
      opacity: 0.5,
      maxWidth: 262,
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        maxWidth: 'none',
      },
    },
    networksWrapper: {
      width: '100%',
      borderTop: `1px solid ${fade(theme.palette.common.white, 0.2)}`,
      marginTop: 12,
      paddingTop: 28,
    },
  };
});

export const Connect = (props: IConnectProps) => {
  const classes = useConnectStyles();
  const dispatch = useDispatch();
  const handleConnect = useCallback(() => {
    dispatch(UserActions.connect(null));
  }, [dispatch]);

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
        onClick={handleConnect}
        className={classes.button}
      >
        {t('connect.grant')}
      </Button>
      <Typography className={classes.info}>{t('connect.info')}</Typography>

      <div className={classes.networksWrapper}>
        <Headline5>{t('connect.available-networks')}</Headline5>
        <NetworkSelector networks={props.networks} />
      </div>
    </Paper>
  );
};
