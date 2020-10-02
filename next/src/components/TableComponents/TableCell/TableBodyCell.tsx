import { AlignType, IStyleProps } from '../types';
import React from 'react';
import classNames from 'classnames';
import { useCellStyles } from './TableCellStyles';
import { BackgroundColorProvider } from '../../../UiKit/BackgroundColorProvider';

interface IBodyCellProps {
  className?: string;
  align?: AlignType;
  children: React.ReactNode;
}

export const BodyCell = ({
  className,
  alignCell,
  align,
  defense,
  paddingCollapse,
  children,
}: IBodyCellProps & IStyleProps) => {
  const classes = useCellStyles({ defense, paddingCollapse });
  return (
    <BackgroundColorProvider
      className={classNames(
        className,
        classes.cell,
        classes.bodyCell,
        (alignCell === 'center' || align === 'center') && classes.centerCell,
        (alignCell === 'right' || align === 'right') && classes.rightCell,
        (alignCell === 'left' || align === 'left') && classes.leftCell,
      )}
      role="cell"
      component="div"
    >
      <div className={classes.cellWrapper}>{children}</div>
    </BackgroundColorProvider>
  );
};
