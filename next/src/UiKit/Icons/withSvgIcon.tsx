import React, { forwardRef, memo, ReactNode } from 'react';
import { SvgIcon, Theme, withTheme } from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon/SvgIcon';
import { CSSProperties, makeStyles } from '@material-ui/styles';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const styles: { [key in Size]: CSSProperties } = {
  xs: {
    fontSize: 16,
  },
  sm: {
    fontSize: 24,
  },
  md: {
    fontSize: 32,
  },
  lg: {
    fontSize: 64,
  },
  xl: {
    fontSize: 128,
  },
};

const useStyles = makeStyles<Theme, ISvgIconProps>(() => ({
  root: ({ size = 'sm' }) => ({
    ...styles[size],
  }),
}));

export interface ISvgIconProps extends SvgIconProps {
  size?: Size;
  theme: Theme;
}

export const withSvgIcon = (element: ReactNode, extraProps?: SvgIconProps) => {
  return memo(
    withTheme(
      forwardRef((props: ISvgIconProps, ref) => {
        const {
          theme,
          htmlColor = props.theme.palette.grey['700'],
          ...rest
        } = props;

        const classes = useStyles(props);

        return (
          <SvgIcon
            classes={{ root: classes.root }}
            htmlColor={htmlColor}
            innerRef={ref}
            {...extraProps}
            {...rest}
          >
            {element}
          </SvgIcon>
        );
      }),
    ),
  );
};
