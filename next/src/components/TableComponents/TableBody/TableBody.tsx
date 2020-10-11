import React, { ReactNode, useCallback, useState } from 'react';
import { ICustomProps, IStyleProps } from '../types';
import { ScrollBar, VerticalScrollIndicator } from '../../StrollerComponents';
import { StrollableContainer } from 'react-stroller';
import { useTableBodyStyles } from './TableBodyStyles';
import { useResizeObserver } from '../../../common/hooks/useResizeObserver';
import { TableContext } from '../Table/Table';
import { uid } from 'react-uid';

interface ITableBodyProps {
  children: ReactNode;
  rowsCount: number;
}

export const TableBodyComponent = React.forwardRef<
  HTMLDivElement,
  ITableBodyProps & ICustomProps & IStyleProps & { count: number }
>(
  (
    {
      children,
      count,
      customCell,
      defense,
      paddingCollapse,
      rowsCount,
    }: ITableBodyProps & ICustomProps & IStyleProps & { count: number },
    ref,
  ) => {
    const [tableHeight, setTableHeight] = useState(0);
    const [tableBodyRef, setTableBodyRef] = useState<HTMLElement | null>(null);

    useResizeObserver(
      tableBodyRef,
      useCallback(ref => {
        setTableHeight(ref.clientHeight);
      }, []),
    );

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
          scrollKey={`${uid(rowsCount)}${tableHeight}`}
        >
          <div className={classes.body} role="rowgroup" ref={setTableBodyRef}>
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
