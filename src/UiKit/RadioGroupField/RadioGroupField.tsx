import { FormHelperText, RadioGroup, RadioGroupProps } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { getErrorText, hasError } from '../../common/utils/form';

interface IRadioGroupFieldProps extends FieldRenderProps<string> {
  children: ReactNode;
}

export const RadioGroupField = ({
  input: { name, onChange, value },
  children,
  meta,
  ...rest
}: IRadioGroupFieldProps & RadioGroupProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value as any);
  };

  return (
    <RadioGroup name={name} value={value} onChange={handleChange} {...rest}>
      {children}
      {hasError(meta) && (
        <FormHelperText error={true}>{getErrorText(meta)}</FormHelperText>
      )}
    </RadioGroup>
  );
};
