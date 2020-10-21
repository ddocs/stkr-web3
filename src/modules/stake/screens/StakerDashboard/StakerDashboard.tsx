import React from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { useStakerDasboardStyles } from './StakerDashboardStyles';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { Body1 } from '../../../../UiKit/Typography';
import { t } from '../../../../common/utils/intl';
import { Amount } from './components/Amount';
import { TableHead } from '../../../../components/TableComponents/TableHead';
import { TableHeadCell } from '../../../../components/TableComponents/TableHeadCell';
import { TableBody } from '../../../../components/TableComponents/TableBody';
import { TableRow } from '../../../../components/TableComponents/TableRow';
import { uid } from 'react-uid';
import { TableBodyCell } from '../../../../components/TableComponents/TableBodyCell';
import { Table } from '../../../../components/TableComponents/Table';
import { useLocaleMemo } from '../../../../common/hooks/useLocaleMemo';
import { NavLink } from '../../../../UiKit/NavLink';
import { STAKER_STAKE_PATH } from '../../../../common/const';

const data = [
  {
    date: new Date(),
    staked: 3.5,
    reward: 0.001,
  },
  {
    date: new Date(),
    staked: 3.5,
    reward: 0.001,
  },
];

export const StakerDashboardComponent = () => {
  const classes = useStakerDasboardStyles();

  const captions = useLocaleMemo(
    () => [
      {
        label: t('staked-dashboard.column.date'),
      },
      {
        label: t('staked-dashboard.column.staked'),
      },
      {
        label: t('staked-dashboard.column.rewards'),
      },
    ],
    [],
  );

  return (
    <section className={classes.component}>
      <Curtains classes={{ root: classes.wrapper }}>
        <div className={classes.content}>
          <BackgroundColorProvider className={classes.staked}>
            <Body1 className={classes.stakedTitle}>
              {t('staked-dashboard.staked')}
            </Body1>
            <div className={classes.stakedAmount}>
              <Amount value={'9.542'} unit={t('staked-dashboard.eth')} />
            </div>
            <div className={classes.stakedButton}>
              <NavLink
                variant="contained"
                color="primary"
                size="large"
                href={STAKER_STAKE_PATH}
                fullWidth={true}
              >
                {t('staked-dashboard.stake-more')}
              </NavLink>
            </div>
          </BackgroundColorProvider>
          <BackgroundColorProvider className={classes.reward}>
            <Body1 className={classes.rewardTitle}>
              {t('staked-dashboard.my-rewards')}
            </Body1>
            <Amount value={'0.0494'} unit={t('staked-dashboard.eth')} />
          </BackgroundColorProvider>
          <BackgroundColorProvider className={classes.history}>
            <Table customCell="1fr 1fr 1fr" columnsCount={captions.length}>
              <TableHead>
                {captions.map(cell => (
                  <TableHeadCell label={cell.label} />
                ))}
              </TableHead>
              {data && (
                <TableBody rowsCount={data.length}>
                  {data.map(item => (
                    <TableRow key={uid(item)}>
                      <TableBodyCell>
                        {t('format.date', { value: item.date })}
                      </TableBodyCell>
                      <TableBodyCell>
                        {t('units.eth', { value: item.staked })}
                      </TableBodyCell>
                      <TableBodyCell>
                        {t('units.eth', { value: item.reward })}
                      </TableBodyCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </BackgroundColorProvider>
        </div>
      </Curtains>
    </section>
  );
};

export const StakerDashboard = () => {
  return <StakerDashboardComponent />;
};
