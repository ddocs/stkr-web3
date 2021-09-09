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
import { getParachainBondsLendPath } from '../../../../common/const';
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

  const { slotAuctionSdk, isConnected, networkType } = useSlotAuctionSdk();

  const { crowdloans } = useCrowdloans(slotAuctionSdk, 'ONGOING');

  const { balances } = useCrowdloanBalances();

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
                  <TableBodyCell>
                    <Box display="flex" alignItems="center">
                      <img
                        src={item.projectLogo}
                        alt=""
                        className={classes.img}
                      />
                      {item.projectName}
                    </Box>
                  </TableBodyCell>
                  <TableBodyCell>
                    {t(`polkadot-slot-auction.crowdloan-status.${item.status}`)}
                  </TableBodyCell>
                  <TableBodyCell>
                    {new Date(item.startTime * 1000).toLocaleDateString()} –{' '}
                    {new Date(item.endTime * 1000).toLocaleDateString()}
                  </TableBodyCell>
                  <TableBodyCell>
                    <Body2 color="secondary">
                      {item.stakeFiContributed.toString(10)} {networkType}
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
                            href={getParachainBondsLendPath(
                              networkType.toLowerCase(),
                              item.loanId,
                              item.projectName,
                            )}
                          >
                            <Button
                              variant="outlined"
                              className={classes.button}
                            >
                              {balance ? (
                                <>
                                  {t('polkadot-slot-auction.provided-button', {
                                    value: balance,
                                    currency: networkType,
                                  })}
                                  <span className={classes.plus}>+</span>
                                </>
                              ) : (
                                t('polkadot-slot-auction.contribute-button', {
                                  currency: networkType,
                                })
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
                        {t('polkadot-slot-auction.contribute-button', {
                          currency: networkType,
                        })}
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
