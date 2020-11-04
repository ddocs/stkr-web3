import React, { PropsWithChildren, useCallback, useRef, useState } from 'react';
import { useHeaderStyles } from './HeaderStyles';
import classNames from 'classnames';
import { Curtains } from '../../../../UiKit/Curtains';
import { Logotype } from '../Logotype';
import { Toggle } from '../Toggle';
import { useIsSMDown } from '../../../../common/hooks/useTheme';
import { FocusOn } from 'react-focus-on';
import { useWindowSize } from '../../../../common/hooks/useWindowSize';

export const HeaderFrame = ({
  children,
  outerClassName,
  innerClassName,
  dropdownClassName,
}: PropsWithChildren<{
  outerClassName: string | undefined;
  innerClassName: string | undefined;
  dropdownClassName: string | undefined;
}>) => {
  const isSMDown = useIsSMDown();

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
          {isSMDown ? (
            <Toggle onClick={handleOpen} ref={modalControlRef} opened={on} />
          ) : (
            children
          )}
        </Curtains>
      </header>
      {isSMDown && (
        <FocusOn
          enabled={on}
          onEscapeKey={handleClose}
          onClickOutside={handleClose}
          shards={[modalControlRef]}
        >
          <div
            className={classNames(
              classes.mobile,
              on && classes.visible,
              dropdownClassName,
            )}
          >
            {children}
          </div>
        </FocusOn>
      )}
    </>
  );
};
