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
import { ICrowdloanType, SlotAuctionSdk } from '@ankr.com/stakefi-polkadot';
import BigNumber from 'bignumber.js';
import { useQuery } from '@redux-requests/react';
import { SlotAuctionActions } from '../../actions/SlotAuctionActions';

interface IOngoingProps {
  slotAuctionSdk: SlotAuctionSdk;
}

export const Ongoing = ({ slotAuctionSdk }: IOngoingProps) => {
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

  const isConnected = slotAuctionSdk.isConnected();
  const customCell = `1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr`;

  const {
    data: crowdloans,
  }: {
    data: ICrowdloanType[];
  } = useQuery({
    type: SlotAuctionActions.fetchCrowdloans,
    defaultData: [],
    variables: [
      slotAuctionSdk,
      'SUCCEEDED', // TODO: "replace with ONGOING when u're ready for it"
    ],
    autoLoad: true,
  });

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
        {crowdloans.map(item => (
          <TableRow key={uid(item)}>
            <TableBodyCell>{item.name}</TableBodyCell>
            <TableBodyCell>{item.status}</TableBodyCell>
            <TableBodyCell>
              {item.startTime}-${item.endTime}
            </TableBodyCell>
            <TableBodyCell>{item.totalRaiseTarget.toString(10)}</TableBodyCell>
            <TableBodyCell>
              {item.stakeFiContributed.toString(10)}
            </TableBodyCell>
            <TableBodyCell>N/A</TableBodyCell>
            <TableBodyCell>N/A</TableBodyCell>
            <TableBodyCell align="right">
              <Button
                variant="outlined"
                className={classes.button}
                onClick={async () => {
                  // FIXME: "take random account"
                  const [
                    polkadotAccount,
                  ] = await slotAuctionSdk.getPolkadotAccounts();
                  const amount = prompt('Enter lend amount: ');
                  await slotAuctionSdk.depositFundsToCrowdloan(
                    polkadotAccount,
                    item.loanId,
                    new BigNumber(`${amount}`),
                  );
                }}
                disabled={!isConnected}
              >
                {t('polkadot-slot-auction.lend-dot-button')}
              </Button>
              <Button
                variant="outlined"
                className={classes.button}
                onClick={async () => {
                  // FIXME: "don't take random account"
                  const [
                    polkadotAccount,
                  ] = await slotAuctionSdk.getPolkadotAccounts();
                  const amount = prompt('Enter lend amount: ');
                  await slotAuctionSdk.depositFundsToCrowdloan(
                    polkadotAccount,
                    item.loanId,
                    new BigNumber(`${amount}`),
                  );
                }}
                disabled={!isConnected}
              >
                {t('polkadot-slot-auction.claim-dot-button')}
              </Button>
            </TableBodyCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
