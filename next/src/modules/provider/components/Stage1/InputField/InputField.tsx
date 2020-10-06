import classNames from 'classnames';
import { TextField, TextFieldProps } from '@material-ui/core';
import React, { ReactElement, ReactNode } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { useInputFieldStyles } from './InputFieldStyles';
import { useTextFieldStyles } from './TextFieldStyles';
import { getErrorText, hasError } from '../../../../../common/utils/form';

interface IFieldProps extends FieldRenderProps<string, HTMLElement> {
  className?: string;
  multiline?: boolean;
  children: ReactElement<{ value: string; children: ReactNode }>[];
  placeholder?: string;
  label: string;
}

export const InputField = ({
  className,
  multiline,
  input: { name, onChange, value },
  meta,
  placeholder,
  label,
  ...props
}: IFieldProps & TextFieldProps) => {
  const componentStyles = useInputFieldStyles();
  const classes = useTextFieldStyles();
  return (
    <label className={classNames(componentStyles.component, className)}>
      <span className={componentStyles.label}>{label}</span>
      <TextField
        name={name}
        error={hasError(meta)}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        InputProps={{ classes }}
        multiline={multiline}
        rows={multiline ? 6 : 1}
        {...props}
      />
      <div className={componentStyles.wrapper}>
        {hasError(meta) && (
          <div className={componentStyles.message}>{getErrorText(meta)}</div>
        )}
      </div>
    </label>
  );
};
