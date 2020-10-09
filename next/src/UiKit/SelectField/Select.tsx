import React, { ReactNode, Ref } from 'react';
import TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import { memo, useMemo } from 'react';
import MenuItem, { MenuItemProps } from '@material-ui/core/MenuItem';
import { OutlinedInputProps } from '@material-ui/core';
import classNames from 'classnames';
import { getErrorText, hasError } from '../../common/utils/form';
import { useSelectFieldStyles } from './SelectFieldStyles';
import { uid } from 'react-uid';
import { FormControlProps } from '@material-ui/core/FormControl';
import { FieldRenderProps } from 'react-final-form';

const MenuItemMemoized = memo(
  React.forwardRef((props: Omit<MenuItemProps, 'button'>, ref: Ref<any>) => {
    return <MenuItem {...props} innerRef={ref} />;
  }),
  (prev, next) => prev.value === next.value && prev.children === next.children,
);

export interface ISelectOption {
  value?: string | number;
  key?: string | number;
  label?: string;
  disabled?: boolean;
}

interface ISelectComponent
  extends OutlinedTextFieldProps,
    FieldRenderProps<any> {
  className?: string;
  values: ISelectOption[];
  readOnly?: boolean;
  disabled?: boolean;
  color?: 'primary' | 'secondary';
}

const SHRINK = { shrink: true };
const SELECT_PROPS = {
  MenuProps: { keepMounted: true },
};

export const Select = ({
  input: { name, onChange, value },
  meta,
  values,
  readOnly,
  disabled,
  className,
  SelectProps,
  helperText,
  error,
  color,
  ...rest
}: ISelectComponent) => {
  const items = useMemo(() => {
    return values.map(option => (
      <MenuItemMemoized
        key={uid(option)}
        value={option.value}
        disabled={option.disabled}
      >
        {option.label}
      </MenuItemMemoized>
    ));
  }, [values]);

  const classes = useSelectFieldStyles();

  return (
    <div className={classNames(classes.component, className)}>
      <TextField
        className={classNames(
          classes.input,
          color === 'primary' && classes.inputPrimary,
          color === 'secondary' && classes.inputSecondary,
          (readOnly || disabled) && classes.inputDisabled,
        )}
        select={true}
        InputLabelProps={SHRINK}
        value={value}
        InputProps={
          { disableUnderline: true, readOnly: readOnly } as Partial<
            OutlinedInputProps
          >
        }
        SelectProps={{ ...SELECT_PROPS, ...SelectProps }}
        disabled={disabled}
        name={name}
        onChange={onChange}
        {...rest}
      >
        {items}
      </TextField>
      <div className={classes.wrapper}>
        {hasError(meta) && (
          <div className={classes.message}>{getErrorText(meta)}</div>
        )}
      </div>
    </div>
  );
};
