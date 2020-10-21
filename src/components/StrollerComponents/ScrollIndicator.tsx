import classNames from 'classnames';
import * as React from 'react';
import { StrollerState } from 'react-stroller';
import { useScrollIndicatorStyles } from './ScrollIndicatorStyles';

interface IIndicatopProps {
  topOffset?: number;
}

export const VerticalScrollIndicator = ({ topOffset = 0 }: IIndicatopProps) => {
  const classes = useScrollIndicatorStyles({ offset: topOffset });

  return (
    <StrollerState>
      {({ scrollTop, scrollHeight, clientHeight }) => (
        <>
          <span
            className={classNames(
              classes.indicator,
              classes.indicatorVertical,
              classes.indicatorTop,
              scrollTop === 0 && classes.indicatorHidden,
            )}
          />
          <span
            className={classNames(
              classes.indicator,
              classes.indicatorVertical,
              classes.indicatorBottom,
              scrollTop + clientHeight >= scrollHeight &&
                classes.indicatorHidden,
            )}
          />
        </>
      )}
    </StrollerState>
  );
};
