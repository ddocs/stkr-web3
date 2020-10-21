import { useEffect } from 'react';

/**
 * adds DOM event listener
 * @param target - can be null, that means - do not add anything
 * @param type
 * @param listener
 * @param options
 */
export const useEventListener = (
  target: EventTarget,
  type: string,
  listener: EventListenerOrEventListenerObject,
  options: AddEventListenerOptions,
) => {
  useEffect(
    () => {
      if (!target) {
        return () => null;
      }
      target.addEventListener(type, listener, options);

      return () => {
        target.removeEventListener(type, listener, options);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [target, listener],
  );
};
