import classNames from 'classnames';
import React, { ReactNode, useCallback, useRef, useState } from 'react';
import { FocusOn } from 'react-focus-on';
import { useIsLGUp } from '../../../../common/hooks/useTheme';
import { useWindowSize } from '../../../../common/hooks/useWindowSize';
import { Curtains } from '../../../../UiKit/Curtains';
import { Logotype } from '../Logotype';
import { Toggle } from '../Toggle';
import { useHeaderStyles } from './HeaderStyles';

interface IHeaderFrameProps {
  outerClassName: string | undefined;
  innerClassName: string | undefined;
  dropdownClassName: string | undefined;
  children?: ReactNode;
}

export const HeaderFrame = ({
  children,
  outerClassName,
  innerClassName,
  dropdownClassName,
}: IHeaderFrameProps) => {
  const isLGUp = useIsLGUp();

  const modalControlRef = useRef<HTMLButtonElement>(null);

  const [on, setOn] = useState(false);

  const [animation, setAnimation] = useState<string | undefined>(undefined);

  const handleOpen = useCallback(() => {
    if (animation === 'enable') {
      setTimeout(() => {
        setOn(false);
        setAnimation('disable');
      }, 450);
      setTimeout(() => setAnimation(undefined), 800);
    }
    if (animation === undefined) {
      setOn(!on);
      setAnimation('enable');
    }
  }, [animation, on]);

  const handleClose = useCallback(() => {
    if (animation === 'enable') {
      setTimeout(() => {
        setOn(false);
        setAnimation('disable');
      }, 450);
      setTimeout(() => setAnimation(undefined), 800);
    }
  }, [animation]);

  const [, windowHeight] = useWindowSize();

  const classes = useHeaderStyles({ height: windowHeight });

  return (
    <>
      <header className={classNames(classes.component, outerClassName)}>
        <Curtains classes={{ root: innerClassName }}>
          <Logotype className={classes.logo} />
          {isLGUp ? (
            children
          ) : (
            <Toggle onClick={handleOpen} ref={modalControlRef} opened={on} />
          )}
        </Curtains>
      </header>

      {!isLGUp && (
        <>
          <div
            className={classNames(
              classes.navShadow,
              on && classes.navShadowActive,
            )}
          />

          <FocusOn
            enabled={on}
            onEscapeKey={handleClose}
            onClickOutside={handleClose}
            shards={[modalControlRef]}
          >
            <div
              className={classNames(
                classes.mobile,
                on && classes.mobileVisible,
                dropdownClassName,
              )}
            >
              {children}
            </div>
          </FocusOn>
        </>
      )}
    </>
  );
};
