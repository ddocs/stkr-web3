import { Slider, SliderProps } from '@material-ui/core';
import React from 'react';
import { FieldRenderProps } from 'react-final-form';

interface ISliderProps extends FieldRenderProps<HTMLElement>, SliderProps {
  label?: string;
}

export const SliderField = ({
  className,
  input: { name, onChange, value },
  label,
  ...props
}: ISliderProps) => {
  const handleOnChange = (
    event: React.ChangeEvent<{}>,
    value: number | number[],
  ) => {
    onChange(value as any);
  };

  return (
    <Slider name={name} value={+value} onChange={handleOnChange} {...props} />
  );
};
