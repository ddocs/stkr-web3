import { ICustomProps, IStyleProps } from '../types';
import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useTableRowStyles } from './TableRowStyles';
import { TableContext } from '../DataTable';

interface ITableRowProps {
  className?: string;
  hover?: boolean;
  children: ReactNode;
}

export const TableRowComponent = ({
  className,
  hover,
  children,
}: ITableRowProps & ICustomProps & IStyleProps) => {
  const classes = useTableRowStyles();

  return (
    <div
      className={classNames(
        className,
        classes.row,
        hover && classes.rowHovered,
      )}
      role="row"
    >
      {children}
    </div>
  );
};

export const TableRow = (props: Omit<ITableRowProps, 'tableWidth'>) => {
  return (
    <TableContext.Consumer>
      {context => {
        return <TableRowComponent {...context} {...props} />;
      }}
    </TableContext.Consumer>
  );
};
