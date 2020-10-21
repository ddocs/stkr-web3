import classNames from 'classnames';
import * as React from 'react';
import { useScrollBarStyles } from './ScrollBarStyles';

export const ScrollBar = ({
  transparent,
  sideOffset,
  topOffset,
}: {
  transparent?: boolean;
  sideOffset?: number;
  topOffset?: number;
}) => {
  const classes = useScrollBarStyles({ sideOffset, topOffset });
  return (
    <div
      className={classNames(classes.bar, transparent && classes.barTransparent)}
    />
  );
};

export const TransparentScrollBar = () => <ScrollBar transparent={true} />;
