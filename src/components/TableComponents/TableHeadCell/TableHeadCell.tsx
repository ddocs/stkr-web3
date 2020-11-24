import React, { useContext } from 'react';
import { AlignType, IStyleProps } from '../types';
import classNames from 'classnames';
import { useCellStyles } from './TableHeadCellStyles';
import { BackgroundColorProvider } from '../../../UiKit/BackgroundColorProvider';
import { TableContext } from '../Table/Table';
import { WithUseStyles } from '../../../common/types';

interface ITableHeadCellProps extends Partial<WithUseStyles<typeof useCellStyles>> {
  className?: string;
  label: React.ReactNode;
  align?: AlignType;
}

const TableHeadCellComponent = (props: ITableHeadCellProps & IStyleProps) => {
  const { className, alignCell, align, label } = props;

  const classes = useCellStyles(props);

  return (
    <BackgroundColorProvider
      className={classNames(
        classes.cell,
        classes.headCell,
        (alignCell === 'center' || align === 'center') && classes.centerCell,
        (alignCell === 'right' || align === 'right') && classes.rightCell,
        (alignCell === 'left' || align === 'left') && classes.leftCell,
        className,
      )}
      role="cell"
      component="div"
    >
      <div className={classes.content}>{label}</div>
    </BackgroundColorProvider>
  );
};

export const TableHeadCell = (props: ITableHeadCellProps) => {
  const context = useContext(TableContext);
  return <TableHeadCellComponent {...context} {...props} />;
};
