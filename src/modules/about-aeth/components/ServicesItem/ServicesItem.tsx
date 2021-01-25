import React from 'react';
import classNames from 'classnames';
import { ServicesLogo, ServicesLogoNameType } from '../ServicesLogo';
import { useServicesItemStyles } from './ServicesItemStyles';
import { Typography } from '@material-ui/core';

interface IServicesItemProps {
  logo: ServicesLogoNameType;
  text: string;
  className?: string;
}

export const ServicesItem = ({ logo, text, className }: IServicesItemProps) => {
  const classes = useServicesItemStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <ServicesLogo
        className={classNames(classes.logo, classes[logo])}
        name={logo}
      />

      <Typography className={classes.text} component="p">
        {text}
      </Typography>
    </div>
  );
};
