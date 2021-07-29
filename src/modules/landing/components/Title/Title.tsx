import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useStyles } from './Styles';
import SectionWrapper from '../SectionWrapper/SectionWrapper';

const MINIMAL_PADDING_TOP = 130;
const HEADER_HEIGHT = 60;

const Title = () => {
  const classes = useStyles();
  const [paddingTop, setPaddingTop] = useState(MINIMAL_PADDING_TOP);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleResize = () => {
      if (ref.current?.clientHeight) {
        setPaddingTop(
          Math.max(
            window.innerHeight - ref.current.clientHeight - HEADER_HEIGHT,
            MINIMAL_PADDING_TOP,
          ),
        );
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref.current?.clientHeight]);

  return (
    <SectionWrapper needTimeout={false}>
      <div style={{ paddingTop }}>
        <div className={classes.content} ref={ref}>
          <div className={classes.descriptionContainer}>
            <div className={classes.description}>
              On bonded DOT from parachain Slot Auction
            </div>
          </div>
          <div className={classes.title}>Parachain Bonds by Ankr.</div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Title;
