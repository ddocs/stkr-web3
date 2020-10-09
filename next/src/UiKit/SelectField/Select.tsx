import React, { ReactNode, Ref } from 'react';
import TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import { memo, useMemo } from 'react';
import MenuItem, { MenuItemProps } from '@material-ui/core/MenuItem';

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

export interface INamespaceSelectOption {
  value?: string | number;
  key?: string | number;
  label?: string;
  clusterId?: string | React.ReactChild;
}

interface ISelectComponent extends OutlinedTextFieldProps {
  label?: ReactNode;
  values: ISelectOption[];
  placeholder?: string;
  defaultValue?: string;
}

const SHRINK = { shrink: true };
const SELECT_PROPS = {
  MenuProps: { keepMounted: true },
};

const Select = (props: ISelectComponent) => {
  const {
    label,
    values,
    value = undefined,
    fullWidth = true,
    variant = 'outlined',
    defaultValue = '',
    SelectProps,
    ...rest
  } = props;
  const items = useMemo(() => {
    return values.map(option => {
      return (
        <MenuItemMemoized
          key={option.key || option.value || ''}
          value={
            typeof option.value === 'number'
              ? option.value
              : option.value || defaultValue
          }
          disabled={option.disabled}
        >
          {option.label}
        </MenuItemMemoized>
      );
    });
  }, [values, defaultValue]);

  return (
    <TextField
      variant={variant}
      select={true}
      label={label}
      InputLabelProps={SHRINK}
      value={typeof value === 'number' ? value : value || defaultValue}
      fullWidth={fullWidth}
      SelectProps={{ ...SELECT_PROPS, ...SelectProps }}
      {...rest}
    >
      {items}
    </TextField>
  );
};

export { Select };
