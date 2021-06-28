export const roundByStep = (v: number, step: number, offset = 0) =>
  Math.ceil((v - offset) / step ) * step + offset;
