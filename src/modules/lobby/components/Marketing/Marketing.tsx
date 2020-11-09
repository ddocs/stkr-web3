import React, { SVGAttributes } from 'react';
import classNames from 'classnames';
import { useMarketingStyles } from './MarketingStyles';
import { Curtains } from '../../../../UiKit/Curtains';
import { Headline2, Headline5 } from '../../../../UiKit/Typography';
import { t, tHTML } from '../../../../common/utils/intl';
import { NavLink } from '../../../../UiKit/NavLink';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { SURVEY_PATH } from '../../../../common/const';

interface IMarketingProps {
  className?: string;
}

const Arrow = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg width={58} height={58} viewBox="0 0 58 58" fill="none" {...props}>
      <circle cx={29} cy={29} r={29} fill="currentColor" />
      <path
        stroke="#FFE819"
        strokeWidth={3}
        d="M19 28.382h20M30.765 20.765L39 29l-8.235 8.235"
      />
    </svg>
  );
};

export const Marketing = ({ className }: IMarketingProps) => {
  const classes = useMarketingStyles();

  return (
    <section className={classNames(classes.component, className)}>
      <Curtains classes={{ root: classes.wrapper }}>
        <BackgroundColorProvider component="div" className={classes.content}>
          <Headline2 className={classes.title} component="h2">
            {t('about.marketing-title')}
          </Headline2>
          <NavLink href={SURVEY_PATH} className={classes.text} classes={{root: classes.linkRoot}}>
            <Headline5 component="span">
              {tHTML('about.marketing-text')}
            </Headline5>
            <div className={classes.link}>
              <Arrow />
            </div>
          </NavLink>
        </BackgroundColorProvider>
      </Curtains>
    </section>
  );
};
