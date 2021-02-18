import classNames from 'classnames';
import React, { ReactNode, useContext } from 'react';
import { TableContext } from '../Table/Table';
import { ICustomProps, IStyleProps } from '../types';
import { useTableRowStyles } from './TableRowStyles';

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
    <ul
      className={classNames(
        className,
        classes.row,
        hover && classes.rowHovered,
      )}
      role="row"
    >
      {children}
    </ul>
  );
};

export const TableRow = (props: Omit<ITableRowProps, 'tableWidth'>) => {
  const context = useContext(TableContext);
  return <TableRowComponent {...context} {...props} />;
};
