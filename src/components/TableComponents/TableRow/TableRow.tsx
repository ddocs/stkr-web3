import { ICustomProps, IStyleProps } from '../types';
import React, { ReactNode, useContext } from 'react';
import classNames from 'classnames';
import { useTableRowStyles } from './TableRowStyles';
import { TableContext } from '../Table/Table';

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
  const context = useContext(TableContext);
  return <TableRowComponent {...context} {...props} />;
};
