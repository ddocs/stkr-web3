import React from 'react';
import { uid } from 'react-uid';
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
import { useSlotAuctionSdk } from '../../hooks/useSlotAuctionSdk';
import { useCrowdloanBalances, useCrowdloans } from '../../hooks/useCrowdloans';
import { Body2 } from '../../../../UiKit/Typography';
import { NavLink } from '../../../../UiKit/NavLink';
import { getPolkadotSlotAuctionLendPath } from '../../../../common/const';
import { getBalance } from '../../utils/getBalance';
import { SlotAuctionActions } from '../../actions/SlotAuctionActions';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { QueryLoadingCentered } from '../../../../components/QueryLoading/QueryLoading';
import { Query } from '@redux-requests/react';
import { Box } from '@material-ui/core';

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
  },
];

export const Ongoing = () => {
  const classes = useOngoingStyles();

  const { slotAuctionSdk, isConnected, polkadotAccount } = useSlotAuctionSdk();

  const { crowdloans } = useCrowdloans(slotAuctionSdk, 'ONGOING');

  const { balances } = useCrowdloanBalances(
    slotAuctionSdk,
    'ONGOING',
    polkadotAccount,
  );

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
            crowdloans.map(item => {
              const balance = getBalance(balances, item.loanId);

              return (
                <TableRow key={uid(item)}>
                  <TableBodyCell>{item.projectName}</TableBodyCell>
                  <TableBodyCell>
                    {t(`polkadot-slot-auction.crowdloan-status.${item.status}`)}
                  </TableBodyCell>
                  <TableBodyCell>
                    {new Date(item.startTime * 1000).toLocaleDateString()} –{' '}
                    {new Date(item.endTime * 1000).toLocaleDateString()}
                  </TableBodyCell>
                  <TableBodyCell>
                    {/*{item.alreadyContributed.toString(10)}&nbsp;/&nbsp;*/}
                    {/*{item.totalRaiseTarget.toString(10)}&nbsp;DOT*/}
                    <Body2 color="secondary">
                      {item.stakeFiContributed.toString(10)}&nbsp;DOT
                    </Body2>
                  </TableBodyCell>
                  <TableBodyCell align="right">
                    {isConnected ? (
                      <Query
                        type={SlotAuctionActions.fetchCrowdloanBalances}
                        errorComponent={QueryError}
                        loadingComponent={() => (
                          <QueryLoadingCentered size={40} />
                        )}
                      >
                        {() => (
                          <NavLink
                            href={getPolkadotSlotAuctionLendPath(
                              /*item.loanId*/ 2003,
                              item.projectName,
                            )}
                          >
                            <Button
                              variant="outlined"
                              className={classes.button}
                            >
                              {balance ? (
                                <>
                                  {t('polkadot-slot-auction.lent-dot', {
                                    value: balance,
                                  })}
                                  <span className={classes.plus}>+</span>
                                </>
                              ) : (
                                t('polkadot-slot-auction.lend-dot-button')
                              )}
                            </Button>
                          </NavLink>
                        )}
                      </Query>
                    ) : (
                      <Button
                        variant="outlined"
                        className={classes.button}
                        disabled
                      >
                        {t('polkadot-slot-auction.lend-dot-button')}
                      </Button>
                    )}
                  </TableBodyCell>
                </TableRow>
              );
            })
          }
        </Query>
      </TableBody>
    </Table>
  );
};
