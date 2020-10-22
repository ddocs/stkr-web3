import { useState, useEffect } from 'react';

type UseResizeObserverCallback = (ref: Element) => void;

type ResizeObserverCallback = (
  entries: IResizeObserverEntry[],
  observer: ResizeObserver,
) => void;

interface IResizeObserverEntry {
  readonly target: Element;
}

declare class ResizeObserver {
  constructor(callback: ResizeObserverCallback);

  observe: (target: Element) => void;
  unobserve: (target: Element) => void;
}

export const useResizeObserver =
  typeof window === 'undefined' || !(window as any).ResizeObserver
    ? (ref: Element | null, cb: UseResizeObserverCallback) => {
        useEffect(() => {
          if (ref) {
            cb(ref);
          }
        }, [cb, ref]);
      }
    : (ref: Element | null, cb: UseResizeObserverCallback) => {
        const [observer] = useState(
          () => new ResizeObserver(entries => cb(entries[0].target)),
        );

        useEffect(() => {
          if (ref) {
            observer.observe(ref);
            return () => observer.unobserve(ref);
          }
          return () => null;
        }, [observer, ref]);
      };
