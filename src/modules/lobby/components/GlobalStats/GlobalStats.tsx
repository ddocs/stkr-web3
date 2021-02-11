import { Query } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import React, { useCallback } from 'react';
import { t } from '../../../../common/utils/intl';
import { QueryLoadingAbsolute } from '../../../../components/QueryLoading/QueryLoading';
import { UserActionTypes } from '../../../../store/actions/UserActions';
import { IGlobalStats } from '../../../../store/apiMappers/globalStatsApi';
import { Curtains } from '../../../../UiKit/Curtains';
import { Headline1, Headline5 } from '../../../../UiKit/Typography';
import { useMarketingStyles } from './GlobalStatsStyles';

interface IGlobalStatsProps {
  totalStakedEthereum?: BigNumber;
  totalStakers?: number;
}

export const GlobalStatsComponent = ({
  totalStakedEthereum,
  totalStakers,
}: IGlobalStatsProps) => {
  const classes = useMarketingStyles();

  return (
    <section className={classes.root}>
      <Curtains className={classes.container}>
        <div className={classes.cell}>
          <Headline5 color="textSecondary" className={classes.header}>
            {t('global-stats.total-staked')}
          </Headline5>

          <Headline1 className={classes.value}>
            {totalStakedEthereum?.toFormat()}
          </Headline1>
        </div>

        <div className={classes.cell}>
          <Headline5 color="textSecondary" className={classes.header}>
            {t('global-stats.stakers')}
          </Headline5>

          <Headline1 className={classes.value}>
            {t('unit.number-value', { value: totalStakers })}
          </Headline1>
        </div>
      </Curtains>
    </section>
  );
};

export const GlobalStats = () => {
  const classes = useMarketingStyles();

  const renderLoader = useCallback(
    () => (
      <div className={classes.placeHolder}>
        <QueryLoadingAbsolute />
      </div>
    ),
    [classes.placeHolder],
  );

  return (
    <Query<IGlobalStats | null>
      loadingComponent={renderLoader}
      type={UserActionTypes.FETCH_GLOBAL_STATS}
    >
      {({ data }) => (
        <GlobalStatsComponent
          totalStakedEthereum={data?.totalStakedEthereum}
          totalStakers={data?.totalStakers}
        />
      )}
    </Query>
  );
};
