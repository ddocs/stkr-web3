import { useEffect, useState } from 'react';

export const useWindowSize = () => {
  const [size, setSize] = useState(
    typeof window !== 'undefined'
      ? [window.innerWidth, window.innerHeight]
      : [800, 600],
  );

  useEffect(() => {
    const onResize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  });

  return size;
};
