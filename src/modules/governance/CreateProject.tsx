import * as React from 'react';
import { Curtains } from '../../UiKit/Curtains';
import { Headline1 } from '../../UiKit/Typography';
import { t } from '../../common/utils/intl';
import { Box, Paper } from '@material-ui/core';
import { useCreateProjectStyles } from './CreateProjectStyles';

export const CreateProject = () => {
  const classes = useCreateProjectStyles();

  return (
    <section className={classes.root}>
      <Curtains>
        <Box mb={4}>
          <Headline1 align="center" component="h2">
            {t('create-project.title')}
          </Headline1>
        </Box>
        <Paper variant="outlined" square={false}>
          CreateProject
        </Paper>
      </Curtains>
    </section>
  );
};
