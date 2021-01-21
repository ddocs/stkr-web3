import { useRef, useState } from 'react';
import { useIntersectionObserver } from '../../../../common/hooks/useIntersectionObserver';

export const usePromo = () => {
  const [isImgVisible, setIsImgVisible] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver(
    (isVisible: boolean) => {
      if (isVisible) {
        setIsImgVisible(true);
      }
    },
    imgRef,
    {
      once: true,
    },
  );

  useIntersectionObserver(
    (isVisible: boolean) => {
      if (isVisible) {
        setIsTextVisible(true);
      }
    },
    textRef,
    {
      once: true,
    },
  );

  return {
    isImgVisible,
    isTextVisible,
    imgRef,
    textRef,
  };
};
