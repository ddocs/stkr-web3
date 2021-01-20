import { Milliseconds } from '../types';
import { easeInOutQuad, Ease } from './ease';

const progressTo = (
  from: number,
  to: number,
  minStep: number,
  duration: number,
  minDuration: number,
  easing: Ease,
  callback: (value: number) => void,
) => {
  const change = to - from;
  let startTime = 0;
  let lastValue = from;
  let lastTime = 0;

  const worker = (timestamp: number) => {
    if (!startTime && timestamp) {
      startTime = timestamp;
    }
    const progress = Math.min(Math.max(1, timestamp - startTime), duration);
    const newValue = easing(progress, from, change, duration);

    if (progress < duration) {
      if (
        Math.abs(newValue - lastValue) > minStep &&
        timestamp - lastTime > minDuration
      ) {
        lastValue = newValue;
        lastTime = timestamp;
        callback(newValue);
      }
      requestAnimationFrame(worker);
    } else {
      callback(newValue);
    }
  };
  worker(0);
};

/**
 * Scroll to a DOM element
 * @param {Element} element  - The element to scroll to.
 * @param {number}  to       - The position to scroll to, relative to the top
 *                            of the element.
 * @param {number}  duration - How long the scrolling should take in milliseconds.
 */
export const smoothScrollTo = function (
  element: { scrollY: number; scrollTo(x: number, y: number): void },
  to: number,
  duration: Milliseconds,
) {
  const start = element.scrollY;
  progressTo(start, to, 0, duration, 15, easeInOutQuad, val =>
    element.scrollTo(0, val),
  );
};
