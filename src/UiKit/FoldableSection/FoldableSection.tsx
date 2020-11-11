import classNames from 'classnames';
import * as React from 'react';
import { useFoldableSectionStyles } from './FoldableSectionStyles';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePrevious } from '../../common/hooks/usePrevious';

interface IFoldableProps {
  children: React.ReactNode;
  className?: string;
  open: boolean;
  keepMaximum?: boolean;
  useHeight?: boolean;
  timeout: number;
  ssr: boolean;
  duration?: number;
}

const measure = (ref: HTMLDivElement, classes: any) => {
  ref.classList.add(classes.noAnimation);
  ref.classList.add(classes.measureMaxHeight);
  const height = ref.offsetHeight || 0;
  ref.classList.remove(classes.measureMaxHeight);
  // toggle update
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  ref.offsetHeight;
  ref.classList.remove(classes.noAnimation);

  return height;
};

const NOP = () => null;

export const FoldableSection = ({
  className,
  keepMaximum,
  useHeight,
  timeout = 300,
  open: openProp,
  ssr,
  children,
  duration,
}: IFoldableProps) => {
  const [open, setIsOpen] = useState(ssr ? openProp : false);
  const [idle, setIdle] = useState(ssr);
  const [maxHeight, setMaxHeight] = useState(0);
  const blockRef = useRef<HTMLDivElement>(null);
  const [inited, setInited] = useState(ssr);

  const classes = useFoldableSectionStyles({ duration });

  useLayoutEffect(() => {
    setInited(true);
  }, []);

  const oldOpen = usePrevious(openProp);

  // this effect has no deps and checks runs conditions inside to allow change
  // to be applied to the underlay DOM structures
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const { current: ref } = blockRef;

    // detect that changes has to be applied
    const isChanging =
      openProp !== oldOpen || openProp !== open || (openProp && !inited);

    if (!isChanging || !ref) {
      return NOP;
    }

    if (idle) {
      // if changes has to be applied, but component is in "Idle" mode
      // - first disable Idle mode, to prepare component to further transitions
      // and only then proceed
      setIdle(false);
    } else {
      if (openProp) {
        // in case of "going to open" - measure target height
        const measuredHeight = measure(ref, classes);
        setMaxHeight(oldHeight =>
          keepMaximum
            ? Math.max(measuredHeight, oldHeight || 0)
            : measuredHeight,
        );
      }

      setIsOpen(openProp);
      if (openProp) {
        // set idle state at the end of a animation
        const tm = window.setTimeout(() => {
          setIdle(true);
        }, timeout);
        return () => clearTimeout(tm);
      }
    }
    return NOP;
  });

  return (
    <div
      className={classNames(
        className,
        (!open || !idle) && classes.foldableSection,
      )}
      style={
        inited
          ? {
              [useHeight ? 'height' : 'maxHeight']: open
                ? idle
                  ? undefined
                  : maxHeight
                : 0,
            }
          : undefined
      }
      ref={blockRef}
    >
      {children}
    </div>
  );
};
