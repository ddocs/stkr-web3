import React from 'react';
import { ArrowForward } from "@material-ui/icons";
import {Fade} from "@material-ui/core";
import cn from 'classnames';

import { useStyles } from './Styles';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  needFade?: boolean;
}

const Button = ({ text, onClick, className, needFade }: ButtonProps) => {
  const classes = useStyles();

  const renderContent = () => (
    <div className={cn(classes.container, {[className ?? '']: className})} onClick={onClick}>
      <div className={classes.text}>{text}</div>
      <div className={classes.arrow}>
        <ArrowForward fontSize='inherit' style={{ fill: '#ffffff' }} />
      </div>
    </div>
  );

  return needFade ? (
    <Fade in timeout={1500}>
      {renderContent()}
    </Fade>
  ) : renderContent();
};

export default Button;