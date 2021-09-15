import { Button, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Label } from '../../../../components/Label';
import { useFeaturesListVerticalItemStyles } from './FeatureListVerticalItemStyles';

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
export const FeatureListVerticalItem = ({
  Icon,
  title,
  features,
  buttonText,
  onClick,
  onClickTo,
  isNew,
  disabled,
}: IFeatureListVerticalItemProps) => {
  const classes = useFeaturesListVerticalItemStyles();

  return (
    <div className={classes.container}>
      {isNew && <Label className={classes.new} title="NEW" />}
      <Icon className={classes.icon} />
      <Typography className={classes.title} variant="h4">
        {title}
      </Typography>
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
        color="primary"
        size="large"
        className={classes.button}
        fullWidth
        component={RouterLink}
        onClick={onClick}
        to={onClickTo}
        disabled={disabled}
      >
        {buttonText}
      </Button>
    </div>
  );
};
