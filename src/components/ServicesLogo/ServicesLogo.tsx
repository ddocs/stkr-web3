import React from 'react';
import classNames from 'classnames';
import { ReactComponent as BitKeep } from './assets/bitkeep.svg';
import { ReactComponent as ImToken } from './assets/imtoken.svg';
import { ReactComponent as MetaMask } from './assets/metamask.svg';
import { ReactComponent as Onto } from './assets/onto.svg';
import { ReactComponent as OnX } from './assets/onx.svg';
import { ReactComponent as SnowSwap } from './assets/snowswap.svg';
import { ReactComponent as StandCash } from './assets/standcash.svg';
import { ReactComponent as TrustWallet } from './assets/trustwallet.svg';
import { ReactComponent as Uniswap } from './assets/uniswap.svg';
import { useServicesLogoStyles } from './ServicesLogoStyles';

export const servicesLogoMap = {
  bitkeep: BitKeep,
  imtoken: ImToken,
  metamask: MetaMask,
  onto: Onto,
  onx: OnX,
  snowswap: SnowSwap,
  standcash: StandCash,
  trustwallet: TrustWallet,
  uniswap: Uniswap,
};

export type ServicesLogoNameType = keyof typeof servicesLogoMap;

interface IServicesLogoProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  name: ServicesLogoNameType;
}

export const ServicesLogo = ({
  name,
  className,
  ...restProps
}: IServicesLogoProps) => {
  const classes = useServicesLogoStyles();
  const IconComponent = servicesLogoMap[name] || 'span';
  return (
    <i
      role="img"
      className={classNames(classes.root, className)}
      {...restProps}
    >
      <IconComponent className={classes.svg} />
    </i>
  );
};
