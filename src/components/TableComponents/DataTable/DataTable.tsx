import React from 'react';
import {
  ICustomProps,
  IStyleProps,
  ITablesCaptionProps,
  ITablesRowProps,
} from '../types';
import { uid } from 'react-uid';
import { TableBodyCell } from '../TableBodyCell';
import { TableRow } from '../TableRow';
import { TableHead } from '../TableHead';
import { TableBody } from '../TableBody';
import { TableHeadCell } from '../TableHeadCell';
import { Table } from '../Table';
import { WithStyles } from '@material-ui/core';
import { tableStyles } from '../Table/TableStyles';

interface IDataTableProps
  extends Partial<WithStyles<typeof tableStyles>>,
    ICustomProps,
    IStyleProps {
  className?: string;
  captions: ITablesCaptionProps[];
  rows: ITablesRowProps[];
}

export const DataTableComponent = ({
  captions,
  rows,
  ...rest
}: IDataTableProps) => {
  return (
    <Table columnsCount={captions.length} {...rest}>
      <TableHead>
        {captions.map(cell => (
          <TableHeadCell key={cell.key} label={cell.label} align={cell.align} />
        ))}
      </TableHead>
      {rows && (
        <TableBody rowsCount={rows.length}>
          {rows.map(row => (
            <TableRow key={uid(row)}>
              {captions.map(cell => (
                <TableBodyCell key={cell.key} align={cell.align}>
                  {row.data[cell.key]}
                </TableBodyCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
};

export const DataTable = DataTableComponent;
