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
import { useCrowdloanBalances, useCrowdloans } from '../../hooks/useCrowdloans';
import { SlotAuctionActions } from '../../actions/SlotAuctionActions';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { Box } from '@material-ui/core';
import { QueryLoadingCentered } from '../../../../components/QueryLoading/QueryLoading';
import { Query } from '@redux-requests/react';

export const MyRewards = () => {
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

  const { crowdloans } = useCrowdloans(slotAuctionSdk, 'SUCCEEDED');

  const { balances } = useCrowdloanBalances(
    slotAuctionSdk,
    'SUCCEEDED',
    polkadotAccount,
  );

  const handleClaim = async () => {
    const myLoanId = 2003;
    // FIXME: "take random account"
    const [polkadotAccount] = await slotAuctionSdk.getPolkadotAccounts();
    const claimableStakingRewards = await slotAuctionSdk.getClaimableStakingRewards(),
      [currentClaimableRewards] = claimableStakingRewards.filter(
        csr => csr.loanId === myLoanId,
      );
    if (!currentClaimableRewards || currentClaimableRewards.amount.isZero()) {
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
      customCell="1fr 1fr 2fr 1fr 1fr 1fr"
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
        <Query
          type={SlotAuctionActions.fetchCrowdloansByStatus}
          errorComponent={QueryError}
          loadingComponent={() => (
            <Box mt={5}>
              <QueryLoadingCentered />
            </Box>
          )}
        >
          {() =>
            crowdloans.map(item => (
              <TableRow key={uid(item)}>
                <TableBodyCell>{item.projectName}</TableBodyCell>
                <TableBodyCell>
                  {new Date(item.endTime * 1000).toLocaleDateString()}
                </TableBodyCell>
                <TableBodyCell>
                  {balances[item.loanId]
                    ? balances[item.loanId].claimableStakingRewards.toString(10)
                    : '0'}
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
                    {t('polkadot-slot-auction.claim-rewards-button')}
                  </Button>
                </TableBodyCell>
              </TableRow>
            ))
          }
        </Query>
      </TableBody>
    </Table>
  );
};
