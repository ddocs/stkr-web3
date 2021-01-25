import React, { useRef, ReactNode } from 'react';
import {
  useIntersectionObserver,
  IIntersectionObserverOptions,
} from '../../common/hooks/useIntersectionObserver';

interface IInViewProps extends IIntersectionObserverOptions {
  setVisible: (isVisible: boolean) => void;
  children?: ReactNode;
  className?: string;
}

export const InView = ({
  className,
  children,
  setVisible,
  ...restProps
}: IInViewProps) => {
  const itemRef = useRef<any>(null);

  useIntersectionObserver(
    (isVisible: boolean) => setVisible(isVisible),
    itemRef,
    { ...restProps },
  );

  return (
    <div className={className} ref={itemRef}>
      {children}
    </div>
  );
};
