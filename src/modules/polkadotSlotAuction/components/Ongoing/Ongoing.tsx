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
import { Body2 } from '../../../../UiKit/Typography';

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

  const getBalance = (loanId: number) => {
    let balanceResult = ``;
    const balance = balances[loanId];

    if (balance) {
      balanceResult = `${balance.total
        .plus(balance.onchain)
        .plus(balance.claimable)
        .toString(10)}`;
    }

    return balanceResult;
  };

  return (
    <Table
      customCell="3fr 2fr 3fr 2fr 3fr"
      columnsCount={captions.length}
      paddingCollapse
    >
      <TableHead>
        {captions.map(cell => (
          <TableHeadCell
            key={uid(cell)}
            label={cell.label}
            align={cell.align}
          />
        ))}
      </TableHead>
      <TableBody>
        {crowdloans.map(item => {
          const balance = getBalance(item.loanId);

          return (
            <TableRow key={uid(item)}>
              <TableBodyCell>{item.name}</TableBodyCell>
              <TableBodyCell>
                {item.status === 'SUCCEEDED' && 'Active'}
              </TableBodyCell>
              <TableBodyCell>
                {new Date(item.startTime * 1000).toLocaleDateString()} –{' '}
                {new Date(item.endTime * 1000).toLocaleDateString()}
              </TableBodyCell>
              <TableBodyCell>
                {item.alreadyContributed.toString(10)}&nbsp;/&nbsp;
                {item.totalRaiseTarget.toString(10)}&nbsp;DOT
                <Body2 color="secondary">
                  {item.stakeFiContributed.toString(10)}&nbsp;DOT
                </Body2>
              </TableBodyCell>
              <TableBodyCell align="right">
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={() => handleDepositFunds(item)}
                  disabled={!isConnected}
                >
                  {t('polkadot-slot-auction.lend-dot-button')}
                </Button>

                {balance && (
                  <Box mt={1}>
                    <Body2 color="secondary">
                      {t('polkadot-slot-auction.lent-dot', {
                        value: balance,
                      })}
                    </Body2>
                  </Box>
                )}
              </TableBodyCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
