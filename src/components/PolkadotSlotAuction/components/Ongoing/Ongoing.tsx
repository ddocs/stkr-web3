import React from 'react';
import { uid } from 'react-uid';
import { Box } from '@material-ui/core';
import { Button } from '../../../../UiKit/Button';
import { t } from '../../../../common/utils/intl';
import { useOngoingStyles } from './OngoingStyles';
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
    leaseDuration: '13-20',
    totalRaised: '956,000 / 1M DOT',
    raisedOnAnkr: '100,000 / 100,000 DOT',
    expectedInitialReward: '2.5 BNC',
    expectedDailyReward: '2.5 BNC\nAPR: 52%',
  },
  {
    project: 'Bifrost',
    status: 'Active',
    leaseDuration: '13-20',
    totalRaised: '956,000 / 1M DOT',
    raisedOnAnkr: '100,000 / 100,000 DOT',
    expectedInitialReward: '2.5 BNC',
    expectedDailyReward: '2.5 BNC\nAPR: 52%',
  },
];

interface IOngoingProps {
  isConnected: boolean;
}

export const Ongoing = ({ isConnected }: IOngoingProps) => {
  const classes = useOngoingStyles();

  const captions: CaptionType[] = [
    {
      label: t('polkadot-slot-auction.header.project'),
    },
    {
      label: t('polkadot-slot-auction.header.status'),
    },
    {
      label: t('polkadot-slot-auction.header.lease-duration'),
      tip: t('polkadot-slot-auction.header.lease-duration-tip'),
    },
    {
      label: t('polkadot-slot-auction.header.total-raised'),
    },
    {
      label: t('polkadot-slot-auction.header.raised-on-ankr'),
    },
    {
      label: t('polkadot-slot-auction.header.expected-initial-reward'),
      tip: t('polkadot-slot-auction.header.expected-initial-reward-tip'),
    },
    {
      label: t('polkadot-slot-auction.header.expected-daily-reward'),
    },
    {
      label: '',
      align: 'right',
    },
  ];

  if (!isConnected) {
    captions.splice(3, 1);
  }
  const customCell = `1fr 1fr 1fr ${isConnected ? '2fr' : ''} 2fr 2fr 2fr 2fr`;

  return (
    <Table
      customCell={customCell}
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
            <TableBodyCell>{item.leaseDuration}</TableBodyCell>
            {isConnected && <TableBodyCell>{item.totalRaised}</TableBodyCell>}
            <TableBodyCell>{item.raisedOnAnkr}</TableBodyCell>
            <TableBodyCell>{item.expectedInitialReward}</TableBodyCell>
            <TableBodyCell>{item.expectedDailyReward}</TableBodyCell>
            <TableBodyCell align="right">
              <Button
                variant="outlined"
                className={classes.button}
                disabled={!isConnected}
              >
                {t('polkadot-slot-auction.lend-dot')}
              </Button>
            </TableBodyCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
