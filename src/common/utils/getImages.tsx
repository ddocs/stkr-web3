export const getImages = (assets: Record<string, string>) => {
  return Object.keys(assets).reduce((acc, key) => {
    acc[key.replace(/([A-Z])/g, '-$1').toLowerCase()] = assets[key];
    return acc;
  }, {} as typeof assets);
};
