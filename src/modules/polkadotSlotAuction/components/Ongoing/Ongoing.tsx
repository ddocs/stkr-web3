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
import { ICrowdloanType } from '@ankr.com/stakefi-polkadot';
import BigNumber from 'bignumber.js';
import { useSlotAuctionSdk } from '../../hooks/useSlotAuctionSdk';
import { useCrowdloansWithBalances } from '../../hooks/useCrowdloans';

interface IOngoingProps {}

export const Ongoing = ({}: IOngoingProps) => {
  const classes = useOngoingStyles();

  const { slotAuctionSdk, isConnected, polkadotAccount } = useSlotAuctionSdk();

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
      label: t('polkadot-slot-auction.header.raised-on-ankr'),
    },
    {
      label: '',
      align: 'right',
    },
  ];
  const customCell = `2fr 2fr 2fr 2fr 2fr`;

  const { crowdloans, balances } = useCrowdloansWithBalances(
    slotAuctionSdk,
    'SUCCEEDED',
    polkadotAccount,
  );

  const handleDepositFunds = async (item: ICrowdloanType) => {
    const amount = prompt('Enter lend amount: ');
    if (!amount) {
      return;
    }
    await slotAuctionSdk.depositFundsToCrowdloan(
      polkadotAccount,
      item.loanId,
      new BigNumber(`${amount}`),
    );
  };

  const renderDepositButton = (item: ICrowdloanType) => {
    let balanceText = ``;
    const balance = balances[item.loanId];
    if (balance) {
      balanceText = `${balance.total
        .plus(balance.onchain)
        .plus(balance.claimable)
        .toString(10)}`;
    }
    return (
      <div>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={() => handleDepositFunds(item)}
          disabled={!isConnected}
        >
          {t('polkadot-slot-auction.lend-dot-button')}
        </Button>
        <br />
        <p className={classes.subText}>Lent: {balanceText} DOT</p>
      </div>
    );
  };

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
              {new Date(item.startTime).toLocaleDateString()}-
              {new Date(item.endTime).toLocaleDateString()}
            </TableBodyCell>
            <TableBodyCell>
              {item.alreadyContributed.toString(10)}&nbsp;/&nbsp;
              {item.totalRaiseTarget.toString(10)}&nbsp;DOT
              <br />
              <p className={classes.subText}>
                {item.stakeFiContributed.toString(10)}&nbsp;DOT
              </p>
            </TableBodyCell>
            <TableBodyCell align="right">
              {renderDepositButton(item)}
            </TableBodyCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
