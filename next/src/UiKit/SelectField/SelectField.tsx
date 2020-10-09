import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { ISelectOption, Select } from './Select';
import { getErrorText, hasError } from '../../common/utils/form';

interface ISelectFieldProps extends FieldRenderProps<any> {
  values: ISelectOption[];
  className?: string;
}

const SelectField = ({
  input: { name, onChange, value },
  values,
  meta,
  className,
  ...rest
}: ISelectFieldProps & any) => {
  return (
    <Select
      className={className}
      name={name}
      helperText={getErrorText(meta)}
      error={hasError(meta)}
      onChange={onChange}
      value={value}
      values={values}
      {...rest}
    />
  );
};

export { SelectField };
