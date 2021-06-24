import React, { ReactElement } from 'react';
import { Button, Typography } from '@material-ui/core';

import { useFeaturesListVerticalItemStyles } from './FeatureListVerticalItemStyles';
import { Link as RouterLink } from 'react-router-dom';

export interface IFeatureListVerticalItemProps {
  Icon: (props: React.SVGProps<any>) => ReactElement | null;
  title: string;
  features: string[];
  buttonText: string;
  onClick?: () => void;
  onClickTo: string;
  isNew?: boolean;
  disabled?: boolean;
}
export const FeatureListVerticalItem = ({ Icon, title, features, buttonText, onClick, onClickTo, isNew, disabled }: IFeatureListVerticalItemProps) => {
  const classes = useFeaturesListVerticalItemStyles();

  return (
    <div className={classes.container}>
      {isNew && (
        <div className={classes.new}>NEW</div>
      )}
      <Icon className={classes.icon} />
      <Typography className={classes.title} variant="h4">{title}</Typography>
      <div>
        {features.map((text, i) => (
          <div key={i} className={classes.featureItem}>
            <div>•</div>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.featureItemText}
            >
              {text}
            </Typography>
          </div>
        ))}
      </div>
      <Button
        variant="contained"
        className={classes.button}
        fullWidth={true}
        component={RouterLink}
        onClick={onClick}
        to={onClickTo}
        disabled={disabled}
      >
        <div className={classes.buttonText}>
          {buttonText}
        </div>
      </Button>
    </div>
  );
};
