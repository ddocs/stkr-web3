import React from 'react';
import { useMarketingStyles } from './GlobalStatsStyles';
import { Curtains } from '../../../../UiKit/Curtains';
import { Headline1, Headline5 } from '../../../../UiKit/Typography';
import { t } from '../../../../common/utils/intl';
import { Box, Grid } from '@material-ui/core';
import { Query } from '@redux-requests/react';
import { QueryLoadingCentered } from '../../../../components/QueryLoading/QueryLoading';
import { QueryEmpty } from '../../../../components/QueryEmpty/QueryEmpty';
import { UserActionTypes } from '../../../../store/actions/UserActions';
import { IGlobalStats } from '../../../../store/apiMappers/globalStatsApi';

export const GlobalStats = () => {
  const classes = useMarketingStyles();

  return (
    <section className={classes.root}>
      <Query<IGlobalStats | null>
        loadingComponent={QueryLoadingCentered}
        noDataMessage={<QueryEmpty />}
        type={UserActionTypes.FETCH_GLOBAL_STATS}
      >
        {({ data }) => {
          return (
            <Curtains>
              <Grid container={true} spacing={2} className={classes.content}>
                <Grid xs={6} item={true} className={classes.cell}>
                  <Box className={classes.cellContent}>
                    <Headline5 color="primary" className={classes.header}>
                      {t('global-stats.total-staked')}
                    </Headline5>
                    <Headline1 className={classes.value}>
                      {data?.totalStakedEthereum.toFormat()}
                    </Headline1>
                  </Box>
                </Grid>
                <Grid xs={6} item={true} className={classes.cell}>
                  <Box className={classes.cellContent}>
                    <Headline5 color="primary" className={classes.header}>
                      {t('global-stats.stakers')}
                    </Headline5>
                    <Headline1 className={classes.value}>
                      {t('unit.number-value', { value: data?.totalStakers })}
                    </Headline1>
                  </Box>
                </Grid>
              </Grid>
            </Curtains>
          );
        }}
      </Query>
    </section>
  );
};
