import React from 'react';
import { uid } from 'react-uid';
import { Button } from '../../../../UiKit/Button';
import { t } from '../../../../common/utils/intl';
import { useMyRewardsStyles } from './MyRewardsStyles';
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../Table';
import { CaptionType } from '../Table/types';
import { useSlotAuctionSdk } from '../../hooks/useSlotAuctionSdk';
import { useCrowdloansWithBalances } from '../../hooks/useCrowdloans';

interface ICompletedProps {}

export const MyRewards = ({}: ICompletedProps) => {
  const classes = useMyRewardsStyles();

  const { slotAuctionSdk, polkadotAccount } = useSlotAuctionSdk();

  const captions: CaptionType[] = [
    {
      label: t('polkadot-slot-auction.header.parachain-bond'),
    },
    {
      label: t('polkadot-slot-auction.header.date'),
    },
    {
      label: t('polkadot-slot-auction.header.claimable-rewards'),
    },
    {
      label: t('polkadot-slot-auction.header.future-rewards'),
    },
    {
      label: t('polkadot-slot-auction.header.total-rewards'),
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

  const handleClaim = async () => {
    const myLoanId = 2003;
    // FIXME: "take random account"
    const [polkadotAccount] = await slotAuctionSdk.getPolkadotAccounts();
    const claimableStakingRewards =
        await slotAuctionSdk.getClaimableStakingRewards(),
      [currentClaimableRewards] = claimableStakingRewards.filter(
        csr => csr.loanId === myLoanId,
      );
    if (currentClaimableRewards.amount.isZero()) {
      alert(`There is no staking rewards`);
      return;
    }
    await slotAuctionSdk.claimStakingRewards(
      polkadotAccount,
      myLoanId,
      'ERC20',
    );
  };

  return (
    <Table
      customCell="1fr 1fr 1fr 1fr 1fr 1fr"
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
        {crowdloans.map(item => (
          <TableRow key={uid(item)}>
            <TableBodyCell>{item.name}</TableBodyCell>
            <TableBodyCell>
              {new Date(item.endTime).toLocaleDateString()}
            </TableBodyCell>
            <TableBodyCell>
              {balances[item.loanId].claimableStakingRewards.toString(10)}
              &nbsp;ABC
            </TableBodyCell>
            <TableBodyCell>{0}</TableBodyCell>
            <TableBodyCell>{0}</TableBodyCell>
            <TableBodyCell align="right">
              <Button
                variant="outlined"
                className={classes.button}
                onClick={handleClaim}
              >
                {t('polkadot-slot-auction.claim-button')}
              </Button>
            </TableBodyCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
