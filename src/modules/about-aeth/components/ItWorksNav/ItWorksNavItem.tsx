import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useIsLGUp, useIsXLUp } from '../../../../common/hooks/useTheme';
import { useItWorksNavStyles } from './ItWorksNavStyles';

type ClickEventType = React.MouseEvent<HTMLElement, MouseEvent>;

export interface IItWorksNavItemProps {
  title: string;
  text: string;
  keyName: string;
  isActive?: boolean;
  onClick?: (key: string, event: ClickEventType) => void;
}

export const ItWorksNavItem = ({
  title,
  text,
  keyName,
  isActive,
  onClick,
}: IItWorksNavItemProps) => {
  const [textHeight, setTextHeight] = useState<string | number>('auto');
  const textRef = useRef<HTMLParagraphElement>(null);
  const isXLUp = useIsXLUp();
  const isLGUp = useIsLGUp();

  const activeTitleVariant = isXLUp ? 'h3' : 'h4';

  const classes = useItWorksNavStyles({
    textWrapHeight: isActive ? textHeight : 0,
  });

  const clickHandler = useCallback(
    (e: ClickEventType) => {
      if (!isActive && typeof onClick === 'function') {
        onClick(keyName, e);
      }
    },
    [isActive, onClick, keyName],
  );

  useEffect(() => {
    if (textRef.current) {
      setTextHeight(textRef.current.offsetHeight);
    }
  }, [textRef, setTextHeight, textHeight, isLGUp]);

  return (
    <li className={classNames(classes.item, isActive && classes.itemActive)}>
      <Typography
        onClick={clickHandler}
        className={classNames(classes.title, isActive && classes.titleActive)}
        component="div"
        variant={isActive ? activeTitleVariant : 'h5'}
      >
        {title}
      </Typography>

      <div
        className={classNames(
          classes.textWrap,
          isActive && classes.textWrapActive,
        )}
      >
        <Typography
          className={classNames(classes.text, isActive && classes.textActive)}
          component="p"
          color={isActive ? 'textPrimary' : 'textSecondary'}
          ref={textRef}
        >
          {text}
        </Typography>
      </div>
    </li>
  );
};
