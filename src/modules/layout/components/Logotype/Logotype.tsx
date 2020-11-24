import React, { SVGAttributes } from 'react';
import classNames from 'classnames';
import { useLogotypeStyles } from './LogotypeStyles';
import { NavLink } from '../../../../UiKit/NavLink';
import { LogoIcon } from '../../../../UiKit/Icons/LogoIcon';
import { Body2 } from '../../../../UiKit/Typography';
import { t } from '../../../../common/utils/intl';
import {
  ANKR_PATH,
  INDEX_PATH,
  PROVIDER_PATH,
  STAKER_PATH,
} from '../../../../common/const';
import { useRouteMatch } from 'react-router';

const useLogoHref = () => {
  const isStaker = useRouteMatch({ path: STAKER_PATH });
  const isProvider = useRouteMatch({ path: PROVIDER_PATH });

  if (isStaker) {
    return STAKER_PATH;
  }

  if (isProvider) {
    return PROVIDER_PATH;
  }

  return INDEX_PATH;
};

export interface ILogotypeProps {
  className?: string;
}

const Ankr = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg width={49} height={16} viewBox="0 0 49 16" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.259 12.107c.044 0 .066-.031.066-.067v-.058c0-.04-.024-.063-.066-.063h-.17v.188h.17zm-.169.088v.214h-.116v-.58h.278c.123 0 .192.066.192.184 0 .102-.059.159-.132.178l.134.218h-.128l-.125-.214h-.103zm.065.417c.324.025.585-.226.559-.537a.512.512 0 00-.468-.45c-.325-.025-.587.226-.56.537.02.234.225.43.469.45zm-.079-1.088c.445-.081.829.287.744.714a.62.62 0 01-.496.475c-.445.081-.828-.286-.743-.713a.62.62 0 01.495-.476zM24.21 9.05l-.095.027a4 4 0 01-2.224-.006l-.094-.028 1.125-3.53c.027-.086.154-.086.18 0l1.108 3.536zm-2.574-5.096l-3.113 8.77h2.1l.68-2.132.095.028a5.774 5.774 0 003.202.007l.095-.027.666 2.125h2.098l-3.098-8.77a1.417 1.417 0 00-1.345-.925h-.035c-.608 0-1.15.371-1.345.924zM43.246 5.452h-2.229l-2.175 2.81V3.03H36.96v9.695h1.88v-3.49l2.545 3.49h2.097L40.7 8.957a.352.352 0 01.012-.436l2.533-3.07zM33.385 5.452h-3.021c-.932 0-1.687.724-1.687 1.618v5.655h1.88V7.486c0-.23.194-.416.434-.416h1.96c.24 0 .434.186.434.416v5.239h1.88V7.07c0-.894-.755-1.618-1.687-1.618h-.193zM48.832 5.452h-2.559c-.931 0-1.687.724-1.687 1.618v5.655h1.881V7.486c0-.23.194-.416.433-.416h1.932V5.452zM8.625.404l5.283 2.601c.769.38 1.247 1.13 1.247 1.96V6.15h-1.948V4.964a.33.33 0 00-.189-.296l-5.282-2.6a.36.36 0 00-.317 0l-5.283 2.6a.33.33 0 00-.188.296V6.15H0V4.964c0-.83.478-1.58 1.247-1.959L6.53.405a2.384 2.384 0 012.095 0zm.62 7.426c0-.882-.749-1.6-1.668-1.6-.92 0-1.668.718-1.668 1.6 0 .882.748 1.6 1.668 1.6.92 0 1.667-.718 1.667-1.6zm3.773 3.32a.33.33 0 00.189-.296V9.668h1.948v1.186c0 .83-.478 1.58-1.247 1.959l-5.283 2.601a2.385 2.385 0 01-2.095 0l-5.283-2.601C.478 12.434 0 11.683 0 10.853V9.669h1.948v1.186a.33.33 0 00.189.296l4.466 2.2v-2.18c-1.521-.409-2.641-1.751-2.641-3.34 0-1.913 1.622-3.47 3.615-3.47 1.994 0 3.616 1.557 3.616 3.47 0 1.589-1.12 2.931-2.642 3.34v2.18l4.467-2.2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const Logotype = ({ className }: ILogotypeProps) => {
  const classes = useLogotypeStyles();
  const href = useLogoHref();

  return (
    <Body2
      className={classNames(classes.component, className)}
      component="div"
      color="secondary"
    >
      <NavLink
        className={classes.link}
        activeClassName={classes.active}
        color="primary"
        href={href}
        exactMatch={true}
      >
        <LogoIcon />
      </NavLink>
      <NavLink
        href={ANKR_PATH}
        classes={{ label: classes.poweredCaption, root: classes.poweredRoot }}
      >
        {t('by-ankr')}
        <Ankr />
      </NavLink>
    </Body2>
  );
};
