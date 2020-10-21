import { TextField, TextFieldProps } from '@material-ui/core';
import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { getErrorText, hasError } from '../../common/utils/form';

interface IFieldProps extends FieldRenderProps<string> {
  className?: string;
  color?: 'primary' | 'secondary';
  disabled?: boolean;
  readOnly?: boolean;
}

export const InputField = ({
  className,
  input: { name, onChange, value },
  meta,
  color,
  disabled,
  readOnly,
  ...props
}: IFieldProps & TextFieldProps) => {
  return (
    <TextField
      name={name}
      error={hasError(meta)}
      value={value}
      helperText={getErrorText(meta)}
      onChange={onChange}
      {...props}
    />
  );
};
