import React from 'react';
import { uid } from 'react-uid';
import { Box } from '@material-ui/core';
import { Button } from '../../../../UiKit/Button';
import { t } from '../../../../common/utils/intl';
import { useCompletedStyles } from './CompletedStyles';
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../Table';
import { CaptionType } from '../Table/types';

// TODO: remove when data will be from SDK
const data = [
  {
    project: 'Bifrost',
    status: 'Active',
    endLeasePeriod: '13th June 2022',
    totalRaised: '956,000 / 1M DOT',
    dailyReward: '2.5 BNC',
  },
  {
    project: 'Bifrost',
    status: 'Active',
    endLeasePeriod: '13th June 2022',
    totalRaised: '956,000 / 1M DOT',
    dailyReward: '2.5 BNC',
  },
];

interface ICompletedProps {}

export const Completed = ({}: ICompletedProps) => {
  const classes = useCompletedStyles();

  const captions: CaptionType[] = [
    {
      label: t('polkadot-slot-auction.header.project'),
    },
    {
      label: t('polkadot-slot-auction.header.status'),
    },
    {
      label: t('polkadot-slot-auction.header.end-lease-period'),
    },
    {
      label: t('polkadot-slot-auction.header.total-raised'),
    },
    {
      label: t('polkadot-slot-auction.header.daily-reward'),
    },
    {
      label: '',
      align: 'right',
    },
  ];

  return (
    <Table
      customCell="1fr 1fr 2fr 2fr 2fr 2fr"
      columnsCount={captions.length}
      paddingCollapse
    >
      <TableHead>
        {captions.map(cell => (
          <TableHeadCell
            key={uid(cell)}
            label={<Box display="flex">{cell.label}</Box>}
            align={cell.align}
          />
        ))}
      </TableHead>
      <TableBody>
        {data.map(item => (
          <TableRow key={uid(item)}>
            <TableBodyCell>{item.project}</TableBodyCell>
            <TableBodyCell>{item.status}</TableBodyCell>
            <TableBodyCell>{item.endLeasePeriod}</TableBodyCell>
            <TableBodyCell>{item.totalRaised}</TableBodyCell>
            <TableBodyCell>{item.dailyReward}</TableBodyCell>
            <TableBodyCell align="right">
              <Button variant="outlined" className={classes.button}>
                {t('polkadot-slot-auction.claim-dot-button')}
              </Button>
            </TableBodyCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
