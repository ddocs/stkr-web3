/**
 * Returns object without properties given in list `omitKeys`
 */
function omit<T extends object, K extends keyof T>(
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

/**
 * Returns new object with properties given in list `pickKeys`
 */
function pick<T extends object, K extends keyof T>(
  target: T,
  ...pickKeys: K[]
): Pick<T, K> {
  return (Object.keys(target) as K[]).reduce((res, key) => {
    if (pickKeys.includes(key)) {
      res[key] = target[key];
    }
    return res;
  }, {} as any);
}

export { omit, pick };
