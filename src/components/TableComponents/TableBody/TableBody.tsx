import React, { ReactNode, useCallback, useContext, useState } from 'react';
import { ICustomProps, IStyleProps } from '../types';
import { ScrollBar, VerticalScrollIndicator } from '../../StrollerComponents';
import { StrollableContainer } from 'react-stroller';
import { useTableBodyStyles } from './TableBodyStyles';
import { useResizeObserver } from '../../../common/hooks/useResizeObserver';
import { TableContext } from '../Table/Table';

interface ITableBodyProps {
  children: ReactNode;
  rowsCount: number;
}

export const TableBodyComponent = ({
  children,
  count,
  customCell,
  defense,
  paddingCollapse,
  rowsCount,
}: ITableBodyProps & ICustomProps & IStyleProps & { count: number }) => {
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
        scrollKey={`${rowsCount}${tableHeight}`}
      >
        <div className={classes.body} role="rowgroup" ref={setTableBodyRef}>
          {children}
        </div>
      </StrollableContainer>
    </div>
  );
};

export const TableBody = (props: ITableBodyProps) => {
  const context = useContext(TableContext);
  return <TableBodyComponent {...context} {...props} />;
};
