import React, { ReactNode, useRef } from 'react';
import {
  IIntersectionObserverOptions,
  useIntersectionObserver,
} from '../../common/hooks/useIntersectionObserver';

interface IInViewProps extends IIntersectionObserverOptions {
  setVisible: (isVisible: boolean) => void;
  children?: ReactNode;
  className?: string;
  component?: 'div' | 'section' | 'span' | 'p';
}

export const InView = ({
  className,
  children,
  setVisible,
  component = 'div',
  ...restProps
}: IInViewProps) => {
  const itemRef = useRef<any>(null);

  useIntersectionObserver(
    (isVisible: boolean) => setVisible(isVisible),
    itemRef,
    { ...restProps },
  );

  const Component = component;

  return (
    <Component className={className} ref={itemRef}>
      {children}
    </Component>
  );
};
