import React, { useEffect, useState } from 'react';
import { Fade } from '@material-ui/core';
import { useInView } from 'react-intersection-observer';

interface SectionWrapperProps {
  needTimeout?: boolean;
  delay?: number;
  children: React.ReactElement;
}
const SectionWrapper = ({
  children,
  needTimeout = true,
  delay = 100,
}: SectionWrapperProps) => {
  const [isShow, setIsShow] = useState(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      if (needTimeout) {
        setTimeout(() => setIsShow(true), delay);
      } else {
        setIsShow(true);
      }
    }
  }, [inView, needTimeout, delay]);

  return (
    <div ref={ref}>
      <Fade in={isShow} timeout={1700}>
        {children}
      </Fade>
    </div>
  );
};

export default SectionWrapper;
