import classNames from 'classnames';
import { Slider, SliderProps } from '@material-ui/core';
import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { useRangeFieldStyles } from './RangeFieldStyles';
import { Body1 } from '../Typography';

interface IRangeProps extends FieldRenderProps<HTMLElement>, SliderProps {
  label?: string;
}

export const RangeField = ({
  className,
  input: { name, onChange, value },
  label,
  ...props
}: IRangeProps) => {
  const classes = useRangeFieldStyles();

  const handleOnChange = (
    event: React.ChangeEvent<{}>,
    value: number | number[],
  ) => {
    onChange(value as any);
  };

  return (
    <label className={classNames(classes.component, className)}>
      <Body1 component="p" className={classes.label}>
        {label}
      </Body1>
      <span className={classes.value}>{value}</span>
      <Slider
        className={classes.range}
        name={name}
        value={+value}
        onChange={handleOnChange}
        {...props}
      />
    </label>
  );
};
