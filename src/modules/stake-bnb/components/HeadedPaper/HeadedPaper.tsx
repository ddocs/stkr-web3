import * as React from 'react';
import { ReactNode } from 'react';
import { useHeadedPaperStyles } from './HeadedPaperStyles';
import { ReactComponent as BinanceIcon } from './assets/bnb.svg';
import { Box, Paper, Typography } from '@material-ui/core';
import { WithUseStyles } from '../../../../common/types';

interface IHeadedPaperProps
  extends Partial<WithUseStyles<typeof useHeadedPaperStyles>> {
  title: string;
  subtitle: string;
  children?: ReactNode;
}

export const HeadedPaper = (props: IHeadedPaperProps) => {
  const { children, title, subtitle } = props;
  const classes = useHeadedPaperStyles(props);

  return (
    <Paper variant="outlined" square={false} className={classes.root}>
      <Box mb={2.5}>
        <Typography variant="h1" align="center">
          <BinanceIcon className={classes.icon} /> {title}
        </Typography>
      </Box>
      <Box mb={4}>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          className={classes.subtitle}
        >
          {subtitle}
        </Typography>
      </Box>
      <Box maxWidth={455} margin="0 auto">
        {children}
      </Box>
    </Paper>
  );
};
