export type Ease = (
  current: number,
  start: number,
  change: number,
  duration: number,
) => number;

export const easeInOutQuad: Ease = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) {
    return (c / 2) * t * t + b;
  }
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};
