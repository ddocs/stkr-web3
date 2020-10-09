import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { ISelectOption, Select } from './Select';
import { FormControlProps } from '@material-ui/core/FormControl';
import { getErrorText, hasError } from '../../common/utils/form';

interface ISelectFieldProps extends FieldRenderProps<any> {
  values: ISelectOption[];
  formControlProps?: FormControlProps;
  placeholder?: string;
}

const SelectField = ({
  input: { name, onChange, value },
  values,
  meta,
  ...rest
}: ISelectFieldProps & any) => {
  const showError = hasError(meta);

  return (
    <Select
      {...rest}
      name={name}
      helperText={getErrorText(meta)}
      error={!!showError}
      onChange={onChange}
      value={value}
      values={values}
    />
  );
};

export { SelectField };
