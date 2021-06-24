/**
 * Returns object without properties given in list `omitKeys`
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  target: T,
  ...omitKeys: K[]
): Omit<T, K> {
  return (Object.keys(target) as K[]).reduce((res, key) => {
    if (!omitKeys.includes(key)) {
      res[key] = target[key];
    }
    return res;
  }, {} as any);
}
