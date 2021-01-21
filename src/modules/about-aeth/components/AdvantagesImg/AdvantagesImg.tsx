import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { useAdvantagesImgStyles } from './AdvantagesImgStyles';
import { ReactComponent as AethLogo } from './assets/aeth-logo.svg';
import { ReactComponent as EthereumLogo } from './assets/ethereum-logo.svg';
import { useEventListener } from '../../../../common/hooks/useEventListener';
import { useIntersectionObserver } from '../../../../common/hooks/useIntersectionObserver';

interface IAdvantagesImgProps {
  className?: string;
}

export const AdvantagesImg = ({ className }: IAdvantagesImgProps) => {
  const classes = useAdvantagesImgStyles();
  const ref = useRef<HTMLDivElement>(null);
  const aethRef = useRef<HTMLElement>(null);
  const ethereumRef = useRef<HTMLElement>(null);
  const [isVisible, setVisible] = useState(false);

  useIntersectionObserver((visible: boolean) => setVisible(visible), ref);

  useEventListener(
    isVisible ? window : null,
    'scroll',
    () => {
      const eth = ethereumRef.current;
      const aeth = aethRef.current;

      if (eth && aeth) {
        const { top } = ref.current?.getBoundingClientRect() ?? { top: 0 };
        const progress =
          0.5 - Math.max(-0.5, Math.min(1, top / window.innerHeight));
        const y1 = 0.126 * progress;
        const y2 = -0.126 * progress;
        eth.style.transform = `translateY(${y1}em)`;
        aeth.style.transform = `translateY(${y2}em)`;
      }
    },
    {
      passive: false,
    },
  );

  return (
    <div className={classNames(classes.root, className)} ref={ref}>
      <i className={classes.ethereum} ref={ethereumRef}>
        <EthereumLogo className={classes.logo} />
      </i>

      <i className={classes.rectangle} />

      <i className={classes.aeth} ref={aethRef}>
        <AethLogo className={classes.logo} />
      </i>
    </div>
  );
};
