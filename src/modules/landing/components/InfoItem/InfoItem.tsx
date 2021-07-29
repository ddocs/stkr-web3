import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import AnimatedNumber from 'react-animated-numbers';

import { useStyles } from './Styles';
import SectionWrapper from '../SectionWrapper/SectionWrapper';

interface InfoItemProps {
  value: number;
  startValue?: number;
  children: React.ReactNode;
}
const InfoItem = ({ value, children, startValue = 0 }: InfoItemProps) => {
  const classes = useStyles();
  const { ref, inView } = useInView();
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (inView) {
      setTimeout(() => setIsShow(true), 350);
    }
  }, [inView]);

  return (
    <div className={classes.container} ref={ref}>
      <SectionWrapper>
        <div className={classes.container}>
          {isShow ? (
            <>
              <div className={classes.value}>
                <AnimatedNumber
                  animateToNumber={value}
                  includeComma
                  config={{ tension: 150, friction: 40 }}
                />
              </div>
              <div className={classes.description}>{children}</div>
            </>
          ) : null}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default InfoItem;
