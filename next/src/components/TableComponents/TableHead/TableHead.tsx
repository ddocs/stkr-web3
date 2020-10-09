import React, { ReactNode } from 'react';
import { useTableHeadStyles } from './TableHeadStyles';
import { TableContext } from '../DataTable';
import { ICustomProps, IStyleProps } from '../types';

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
  return (
    <TableContext.Consumer>
      {context => {
        return <TableHeadComponent {...context} {...props} />;
      }}
    </TableContext.Consumer>
  );
};
