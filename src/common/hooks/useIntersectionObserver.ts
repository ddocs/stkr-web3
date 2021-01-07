import { useEffect, useState, RefObject } from 'react';
import { callBatched } from './useBatch';

const withIntersectionObserver = (
  cb: (observer: typeof IntersectionObserver) => void,
) => {
  if ('IntersectionObserver' in window) {
    Promise.resolve(IntersectionObserver).then(cb);
  } else {
    import('intersection-observer').then(() => withIntersectionObserver(cb));
  }
};

interface IOptions {
  once?: boolean;
  rootMargin?: string;
  threshold?: number[];
  rootRef?: RefObject<HTMLElement>;
  deps?: any[];
}

export const useIntersectionObserver = (
  callback: any,
  nodeRef: any,
  options: IOptions = {},
) => {
  const [node, setNode] = useState(nodeRef?.current);

  useEffect(
    () => {
      if (node !== nodeRef?.current) {
        setNode(nodeRef?.current);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nodeRef?.current],
  );

  useEffect(
    () => {
      let observer: any;
      let canceled = false;
      if (node) {
        withIntersectionObserver(Observer => {
          if (canceled) {
            return;
          }
          observer = new Observer(
            entries => {
              entries.forEach(
                ({ isIntersecting, intersectionRatio, target }) => {
                  if (nodeRef.current === target) {
                    callBatched(() =>
                      callback(isIntersecting, { ratio: intersectionRatio }),
                    );
                  }
                  if (isIntersecting && options.once) {
                    observer.unobserve(node);
                  }
                },
              );
            },
            {
              rootMargin: options.rootMargin,
              root: options.rootRef ? options.rootRef.current : undefined,
              threshold: options.threshold,
            },
          );

          observer.observe(node);
        });
      }

      return () => {
        canceled = true;
        if (observer) {
          observer.disconnect();
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [node, options.rootMargin, ...(options.deps || [])],
  );
};

const percentageThreshold = (n: number) =>
  Array(n)
    .fill(1)
    .map((_, index, map) => index / map.length);

export const percentageThresholdLow = percentageThreshold(40);
export const percentageThresholdHigh = percentageThreshold(100);
export const percentageThresholdUltra = percentageThreshold(300);
