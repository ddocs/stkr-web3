import React, { ReactNode } from 'react';
import { ICustomProps, IStyleProps } from '../types';
import { ScrollBar, VerticalScrollIndicator } from '../../StrollerComponents';
import { StrollableContainer } from 'react-stroller';
import { TableContext } from '../DataTable';
import { useTableBodyStyles } from './TableBodyStyles';

interface ITableBodyProps {
  children: ReactNode;
}

export const TableBodyComponent = React.forwardRef<
  HTMLDivElement,
  ITableBodyProps & ICustomProps & IStyleProps & { count: number }
>(
  (
    {
      count,
      customCell,
      paddingCollapse,
      defense,
      children,
    }: ITableBodyProps & ICustomProps & IStyleProps & { count: number },
    ref,
  ) => {
    const TableScrollBar = () => <ScrollBar />;

    const classes = useTableBodyStyles({
      count,
      customCell,
      paddingCollapse,
      defense,
    });

    return (
      <div className={classes.bodyWrapper}>
        <StrollableContainer
          bar={TableScrollBar}
          draggable={true}
          inBetween={<VerticalScrollIndicator />}
          // TODO Revert
          // scrollKey={`${uid(rows)}${tableHeight}`}
        >
          <div className={classes.body} role="rowgroup" ref={ref}>
            {children}
          </div>
        </StrollableContainer>
      </div>
    );
  },
);

export const TableBody = React.forwardRef<HTMLDivElement, ITableBodyProps>(
  (props: ITableBodyProps, ref) => {
    return (
      <TableContext.Consumer>
        {context => {
          return <TableBodyComponent {...context} {...props} ref={ref} />;
        }}
      </TableContext.Consumer>
    );
  },
);
