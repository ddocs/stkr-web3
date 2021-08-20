import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@material-ui/core';
import cn from 'classnames';

import { useStyles } from './Styles';

interface PartnerCardAdvantageType {
  text: string;
  isReady: boolean;
}
interface ProductCardProps {
  title: string;
  iconUrl: string;
  advantages: PartnerCardAdvantageType[];
  link: string;
}
const MINIMAL_WIDTH = 280;
const DEFAULT_HEIGHT = 480;

const PartnerCard = ({
  title,
  iconUrl,
  advantages,
  link,
}: ProductCardProps) => {
  const classes = useStyles();
  const [isFocused, setIsFocused] = useState(false);
  const [containerWidth, setContainerWidth] = useState(MINIMAL_WIDTH);
  const ref = useRef<HTMLDivElement | null>(null);
  const isDesktop = useMediaQuery('(min-width:960px)');
  const isMobile = useMediaQuery('(max-width:600px)');

  const getWidth = () =>
    Math.max(ref.current?.getBoundingClientRect().width ?? 0, MINIMAL_WIDTH);

  useEffect(() => {
    if (ref) {
      const handleSetWidth = () => setContainerWidth(getWidth());
      handleSetWidth();
      window.addEventListener('resize', handleSetWidth);
    }
  }, [ref]);

  const handleFocus = () => {
    if (isDesktop) {
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    if (isDesktop) {
      setIsFocused(false);
    }
  };

  const handleClick = () => {
    window.open(link);
  };

  return (
    <div
      ref={ref}
      className={classes.container}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      onClick={handleClick}
      style={{
        background: isFocused
          ? 'rgba(255, 255, 255, 0.2)'
          : 'rgba(255, 255, 255, 0.1)',
        height: isMobile ? containerWidth : DEFAULT_HEIGHT,
      }}
    >
      <div className={classes.header}>
        <img className={classes.icon} src={iconUrl} alt={title} />
        <div className={classes.title}>{title}</div>
      </div>
      {!isMobile && (
        <div
          className={cn(classes.focusedButton, {
            [classes.focusedButtonVisible]: isFocused,
          })}
        >
          Visit {title}
        </div>
      )}
      <div
        className={cn(classes.advantagesContainer, {
          [classes.advantagesContainerHidden]: isFocused,
        })}
      >
        <div className={classes.advantages}>
          {advantages.map(advantage => (
            <div className={classes.advantageItem} key={advantage.text}>
              <img
                src="/landing/icons/plus.svg"
                width={20}
                height={20}
                alt="plus"
              />
              <div className={classes.advantageText}>{advantage.text}</div>
              {!advantage.isReady && <div className={classes.soon}>Soon</div>}
            </div>
          ))}
        </div>
        {!isDesktop && (
          <div className={classes.focusedMobileButton}>Visit {title}</div>
        )}
      </div>
    </div>
  );
};

export default PartnerCard;
