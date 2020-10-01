import * as React from 'react';
import { t } from '../../../../common/utils/intl';
import { Typography, withStyles } from '@material-ui/core';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { lobbyStyles } from './LobbyStyles';

interface IMainProps extends WithStyles<typeof lobbyStyles> {}

export const Main = withStyles(lobbyStyles)(({ classes }: IMainProps) => {
  return (
    <div className={classes.root}>
      <Typography variant="h1">{t('translated-foobar')}</Typography>
    </div>
  );
});
