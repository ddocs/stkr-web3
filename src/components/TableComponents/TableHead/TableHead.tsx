import React, { ReactNode, useContext } from 'react';
import { useTableHeadStyles } from './TableHeadStyles';
import { ICustomProps, IStyleProps } from '../types';
import { TableContext } from '../Table/Table';

interface ITableHeadProps {
  children: ReactNode;
}

export const TableHeadComponent = ({
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
    <div className={classes.head} role="rowgroup">
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