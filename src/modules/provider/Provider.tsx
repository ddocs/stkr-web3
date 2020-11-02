import React from 'react';
import { connect } from 'react-redux';
import { ProviderDashboard } from './screens/ProviderDashboard';
import { UserActions, UserActionTypes } from '../../store/actions/UserActions';
import { useInitEffect } from '../../common/hooks/useInitEffect';
import { Mutation } from '@redux-requests/react';
import { useAuthentication } from '../../common/utils/useAuthentications';
import { Headline2 } from '../../UiKit/Typography';
import { Spinner } from '../../components/Spinner';
import { t } from '../../common/utils/intl';
import { Button, Theme } from '@material-ui/core';
import { Curtains } from '../../UiKit/Curtains';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  component: {
    height: '100%',
    padding: theme.spacing(6, 0),
    boxSizing: 'border-box',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  spinner: {
    margin: 0,
  },
  header: {
    marginBottom: theme.spacing(5),
  },
  button: {
    maxWidth: 224,
    width: '100%',
  },
}));

interface IProviderProps {
  authorizeProvider: typeof UserActions.authorizeProvider;
}

export const ProviderComponent = ({ authorizeProvider }: IProviderProps) => {
  const { isProviderAuthenticated, isConnected } = useAuthentication();
  const classes = useStyles();

  useInitEffect(() => {
    if (!isProviderAuthenticated) {
      authorizeProvider();
    }
  });

  if (isProviderAuthenticated && isConnected) {
    return <ProviderDashboard />;
  }

  return (
    <section className={classes.component}>
      <Curtains classes={{ root: classes.wrapper }}>
        <Mutation type={UserActionTypes.AUTHORIZE_PROVIDER}>
          {({ loading }) => {
            if (loading) {
              return (
                <>
                  <Headline2
                    color="primary"
                    align="center"
                    className={classes.header}
                  >
                    {t('provider.connecting-headline')}
                  </Headline2>
                  <Spinner className={classes.spinner} />
                </>
              );
            }

            return (
              <>
                <Headline2
                  color="primary"
                  align="center"
                  className={classes.header}
                >
                  {t('provider.try-again-headline')}
                </Headline2>
                <Button
                  onClick={authorizeProvider}
                  color="primary"
                  size="large"
                  className={classes.button}
                >
                  {t('provider.try-again')}
                </Button>
              </>
            );
          }}
        </Mutation>
      </Curtains>
    </section>
  );
};

export const Provider = connect(() => ({}), {
  authorizeProvider: UserActions.authorizeProvider,
})(ProviderComponent);
