import React, { useCallback, useMemo } from 'react';
import { uid } from 'react-uid';
import { walletConversion } from '../../../../common/utils/convertWallet';
import { t } from '../../../../common/utils/intl';
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../../../../components/TableComponents';
import { Button } from '../../../../UiKit/Button';
import { BinanceIcon } from '../../../../UiKit/Icons/BinanceIcon';
import { EthIcon } from '../../../../UiKit/Icons/EthIcon';
import { Headline4 } from '../../../../UiKit/Typography';
import { useHistoryStyles } from './HistoryStyles';

const iconsMap = {
  binance: BinanceIcon,
  eth: EthIcon,
};

type Icons = keyof typeof iconsMap;

interface ITxnInfo {
  icon: Icons;
  address: string;
}

export interface ITxnHistory {
  date: Date;
  from: ITxnInfo;
  to: ITxnInfo;
  amount: string | number;
  amountType: string;
  isReady: boolean;
}

interface IHistoryProps {
  className?: string;
  items: ITxnHistory[];
  onClick: () => void;
}

export const History = ({ className, items, onClick }: IHistoryProps) => {
  const classes = useHistoryStyles();

  const captions = useMemo(
    () => [
      t('cross-chain-bridge.history.captions.date'),
      t('cross-chain-bridge.history.captions.txn-type'),
      t('cross-chain-bridge.history.captions.amount'),
      t('cross-chain-bridge.history.captions.status'),
    ],
    [],
  );

  const renderTransaction = useCallback(
    (icon: Icons, address: string) => {
      const Icon = iconsMap[icon];
      return (
        <div className={classes.transaction}>
          <Icon className={classes.transactionIcon} />
          {walletConversion(address)}
        </div>
      );
    },
    [classes],
  );

  const renderedRows = useMemo(
    () =>
      items.map(({ amount, date, from, to, isReady, amountType }, i) => {
        const onClaimClick: React.MouseEventHandler<HTMLButtonElement> = e => {
          onClick();
        };

        return (
          <TableRow key={uid(i)}>
            <TableBodyCell label={captions[0]}>{date.toString()}</TableBodyCell>

            <TableBodyCell label={captions[1]}>
              <div className={classes.transactions}>
                {renderTransaction(from.icon, from.address)}
                <i className={classes.directionIcon} />
                {renderTransaction(to.icon, to.address)}
              </div>
            </TableBodyCell>

            <TableBodyCell label={captions[2]}>
              {`${amount} ${amountType}`}
            </TableBodyCell>

            <TableBodyCell label={captions[3]}>
              <div className={classes.statusCell}>
                {isReady
                  ? t('cross-chain-bridge.history.ready')
                  : t('cross-chain-bridge.history.not-ready')}
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={onClaimClick}
                  disabled={!isReady}
                  className={classes.claimBtn}
                >
                  Claim
                </Button>
              </div>
            </TableBodyCell>
          </TableRow>
        );
      }),
    [classes, items, onClick, renderTransaction, captions],
  );

  return (
    <>
      <Headline4 className={classes.title}>
        {t('cross-chain-bridge.history.title')}
      </Headline4>

      <Table
        columnsCount={captions.length}
        customCell="0.7fr 1fr 0.5fr 230px"
        minWidth={1000}
        paddingCollapse
        dense
      >
        <TableHead>
          {captions.map(caption => (
            <TableHeadCell key={caption} label={caption} />
          ))}
        </TableHead>

        <TableBody>{renderedRows}</TableBody>
      </Table>
    </>
  );
};
