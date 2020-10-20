import classNames from 'classnames';
import {
  OutlinedInputProps,
  TextField,
  TextFieldProps,
} from '@material-ui/core';
import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { useInputFieldStyles } from './InputFieldStyles';
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
  const classes = useInputFieldStyles();

  return (
    <div className={classNames(classes.component, className)}>
      <TextField
        className={classNames(
          classes.input,
          color === 'primary' && classes.inputPrimary,
          color === 'secondary' && classes.inputSecondary,
          (readOnly || disabled) && classes.inputDisabled,
        )}
        name={name}
        error={hasError(meta)}
        value={value}
        onChange={onChange}
        disabled={disabled}
        InputProps={
          {
            disableUnderline: true,
            readOnly: readOnly,
            ...props.InputProps,
          } as Partial<OutlinedInputProps>
        }
        {...props}
      />
      <div className={classes.wrapper}>
        {hasError(meta) && (
          <div className={classes.message}>{getErrorText(meta)}</div>
        )}
      </div>
    </div>
  );
};
