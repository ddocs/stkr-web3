import React from 'react';
import cn from 'classnames';

import { useStyles } from './Styles';

interface NetworkCardProps {
  logo: string;
  title: string;
  url: string;
  description?: string;
  disabled?: boolean;
}

const NetworkCard = ({
  logo,
  title,
  url,
  description,
  disabled,
}: NetworkCardProps) => {
  const classes = useStyles();

  return (
    <div
      className={cn(classes.networkCard, {
        [classes.networkCardDisabled]: disabled,
      })}
    >
      <a href={url}>
        <img className={classes.logo} src={logo} alt="" />
        <div className={classes.title}>{title}</div>
        {description && (
          <div className={classes.description}>{description}</div>
        )}
      </a>
    </div>
  );
};

export default NetworkCard;
