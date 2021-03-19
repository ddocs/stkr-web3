import * as React from 'react';
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../../../../../../components/TableComponents';
import { t } from '../../../../../../common/utils/intl';
import {
  IGetStakingHistoryData,
  IStakingOperation,
} from '../../../../api/apiBinance';
import { NavLink } from '../../../../../../UiKit/NavLink';
import { DEFAULT_FIXED } from '../../../../../../common/const';
import { useHistoryTableBnbStyles } from './HistoryTableBnbStyles';
import { WithUseStyles } from '../../../../../../common/types';
import { useCellStyles } from '../../../../../../components/TableComponents/TableHeadCell/TableHeadCellStyles';
import { uid } from 'react-uid';

function HistoryTableBnbRow({
  operationType,
  amount,
  time,
  txHash,
}: IStakingOperation) {
  return (
    <TableRow>
      <TableBodyCell label={t('history-table-bnb.header.type')}>
        {t(`history-table-bnb.operationType.${operationType}`)}
      </TableBodyCell>
      <TableBodyCell label={t('history-table-bnb.header.amount')}>
        {t('unit.bnb-value', {
          value: amount.decimalPlaces(DEFAULT_FIXED).toFormat(),
        })}
      </TableBodyCell>
      <TableBodyCell label={t('history-table-bnb.header.date')}>
        {t('format.date', { value: time })}
      </TableBodyCell>
      <TableBodyCell label={t('history-table-bnb.header.tx')}>
        <NavLink href={`https://explorer.binance.org/tx/${txHash}`}>
          {txHash}
        </NavLink>
      </TableBodyCell>
    </TableRow>
  );
}

interface IHistoryTableBnbProps
  extends Partial<WithUseStyles<typeof useCellStyles>> {
  data: IGetStakingHistoryData['operations'];
}

export const HistoryTableBnb = (props: IHistoryTableBnbProps) => {
  const { data } = props;
  const classes = useHistoryTableBnbStyles(props);

  return (
    <Table
      customCell="1fr 1fr 1fr 1fr"
      columnsCount={4}
      paddingCollapse
      className={classes.root}
    >
      <TableHead>
        <TableHeadCell label={t('history-table-bnb.header.type')} />
        <TableHeadCell label={t('history-table-bnb.header.amount')} />
        <TableHeadCell label={t('history-table-bnb.header.date')} />
        <TableHeadCell label={t('history-table-bnb.header.tx')} />
      </TableHead>
      <TableBody>
        {data.map(item => (
          <HistoryTableBnbRow key={uid(item)} {...item} />
        ))}
      </TableBody>
    </Table>
  );
};
