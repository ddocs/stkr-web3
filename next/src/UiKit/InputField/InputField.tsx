import classNames from 'classnames';
import {
  OutlinedInputProps,
  TextField,
  TextFieldProps,
} from '@material-ui/core';
import React, { ReactElement, ReactNode } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { useInputFieldStyles } from './InputFieldStyles';
import { useTextFieldStyles } from './TextFieldStyles';
import { getErrorText, hasError } from '../../common/utils/form';

interface IFieldProps extends FieldRenderProps<string> {
  className?: string;
  children: ReactElement<{ value: string; children: ReactNode }>[];
  placeholder?: string;
}

export const InputField = ({
  className,
  input: { name, onChange, value },
  meta,
  placeholder,
  ...props
}: IFieldProps & TextFieldProps) => {
  const componentStyles = useInputFieldStyles();
  const classes = useTextFieldStyles();
  return (
    <label className={classNames(componentStyles.component, className)}>
      <TextField
        name={name}
        error={hasError(meta)}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        InputProps={
          { classes, disableUnderline: true } as Partial<OutlinedInputProps>
        }
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
