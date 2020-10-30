export function safeDiv(value: number | undefined, divider: number | undefined) {
  if (
    !(typeof value === 'number' && typeof divider === 'number') ||
    divider === 0
  ) {
    return 0;
  }

  return value / divider;
}
