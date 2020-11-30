import { TextField, TextFieldProps } from '@material-ui/core';
import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { getErrorText, hasError } from '../../common/utils/form';

interface IFieldProps extends FieldRenderProps<string> {}

export const InputField = ({
  input: { name, onChange, value },
  meta,
  ...rest
}: IFieldProps & TextFieldProps) => {
  return (
    <TextField
      name={name}
      error={hasError(meta)}
      value={value}
      helperText={getErrorText(meta)}
      onChange={onChange}
      {...rest}
    />
  );
};
