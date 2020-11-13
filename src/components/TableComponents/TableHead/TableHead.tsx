import React, { ReactNode, useContext } from 'react';
import { useTableHeadStyles } from './TableHeadStyles';
import { ICustomProps, IStyleProps } from '../types';
import { TableContext } from '../Table/Table';
import classNames from 'classnames';

interface ITableHeadProps {
  className?: string;
  children: ReactNode;
}

export const TableHeadComponent = ({
  className,
  children,
  customCell,
  paddingCollapse,
  count,
}: ITableHeadProps & ICustomProps & IStyleProps & { count: number }) => {
  const classes = useTableHeadStyles({
    count,
    customCell,
    paddingCollapse,
  });

  return (
    <div className={classNames(classes.head, className)} role="rowgroup">
      <div className={classes.row} role="row">
        {children}
      </div>
    </div>
  );
};

export const TableHead = (props: ITableHeadProps) => {
  const context = useContext(TableContext);
  return <TableHeadComponent {...context} {...props} />;
};
