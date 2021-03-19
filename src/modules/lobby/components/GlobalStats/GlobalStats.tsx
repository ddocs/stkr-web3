import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { t } from '../../../../common/utils/intl';
import { UserActionTypes } from '../../../../store/actions/UserActions';
import { IGlobalStats } from '../../../../store/apiMappers/globalStatsApi';
import { Curtains } from '../../../../UiKit/Curtains';
import { Headline1, Headline5 } from '../../../../UiKit/Typography';
import { useMarketingStyles } from './GlobalStatsStyles';
import { uid } from 'react-uid';

interface IGlobalStatsProps {
  totalStakedEthereum?: BigNumber;
  totalStakers?: number;
  isLoading?: boolean;
}

export const GlobalStatsComponent = ({
  totalStakedEthereum,
  totalStakers,
  isLoading = false,
}: IGlobalStatsProps) => {
  const classes = useMarketingStyles();

  const stats = useMemo(
    () => [
      {
        title: t('global-stats.total-staked'),
        value: totalStakedEthereum?.toFormat(),
      },
      {
        title: t('global-stats.total-staked'),
        value: t('unit.number-value', { value: totalStakers }),
      },
    ],
    [totalStakedEthereum, totalStakers],
  );

  const renderedStats = useMemo(
    () =>
      stats.map(item => {
        const { title, value } = item;
        return (
          <div className={classes.cell} key={uid(item)}>
            <Headline5 color="textSecondary" className={classes.header}>
              {title}
            </Headline5>

            <Headline1
              className={classNames(
                classes.value,
                isLoading && classes.valueLoading,
              )}
            >
              {isLoading ? 0 : value}
            </Headline1>
          </div>
        );
      }),
    [classes, isLoading, stats],
  );

  return (
    <section className={classes.root}>
      <Curtains className={classes.container}>{renderedStats}</Curtains>
    </section>
  );
};

export const GlobalStats = () => {
  const { loading, data } = useQuery<IGlobalStats | null>({
    type: UserActionTypes.FETCH_GLOBAL_STATS,
  });

  return loading ? (
    <GlobalStatsComponent isLoading />
  ) : (
    data && !!data.totalStakedEthereum && (
      <GlobalStatsComponent
        totalStakedEthereum={data.totalStakedEthereum}
        totalStakers={data.totalStakers}
      />
    )
  );
};
