import React, { ReactNode, useCallback, useContext, useState } from 'react';
import { ICustomProps, IStyleProps } from '../types';
import { ScrollBar, VerticalScrollIndicator } from '../../StrollerComponents';
import { StrollableContainer } from 'react-stroller';
import { useTableBodyStyles } from './TableBodyStyles';
import { useResizeObserver } from '../../../common/hooks/useResizeObserver';
import { TableContext } from '../Table/Table';
import classNames from 'classnames';

interface ITableBodyProps {
  className?: string;
  children: ReactNode;
  rowsCount: number;
  sideOffset?: number;
}

export const TableBodyComponent = ({
  className,
  sideOffset,
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

  const TableScrollBar = () => <ScrollBar sideOffset={sideOffset} />;

  const classes = useTableBodyStyles({
    count,
    customCell,
    paddingCollapse,
    defense,
  });

  return (
    <div className={classNames(classes.bodyWrapper, className)}>
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
