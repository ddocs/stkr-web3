export function getProgress(value: number, of: number) {
  return value > 0 ? (value / (value + of)) * 100 : 0;
}
