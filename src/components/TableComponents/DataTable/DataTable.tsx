import React from 'react';
import { uid } from 'react-uid';
import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableBodyCell } from '../TableBodyCell';
import { TableHead } from '../TableHead';
import { TableHeadCell } from '../TableHeadCell';
import { TableRow } from '../TableRow';
import {
  ICustomProps,
  IStyleProps,
  ITablesCaptionProps,
  ITablesRowProps,
} from '../types';

interface IDataTableProps extends ICustomProps, IStyleProps {
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
        <TableBody>
          {rows.map(row => (
            <TableRow key={uid(row)}>
              {captions.map(cell => (
                <TableBodyCell
                  key={cell.key}
                  align={cell.align}
                  label={`${cell.label}`}
                >
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
