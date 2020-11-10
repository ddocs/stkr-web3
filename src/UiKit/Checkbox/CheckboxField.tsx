import React, { ReactNode } from 'react';
import { FieldRenderProps } from 'react-final-form';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import { getErrorText, hasError } from '../../common/utils/form';
import { useCheckboxStyles } from './CheckboxFieldStyles';
import { omit } from '../../common/utils/typeUtils';

interface ISwitchFieldProps extends FieldRenderProps<HTMLElement> {
  label: string;
  labelPlacement: string;
  children?: ReactNode;
  showErrorText?: boolean;
}

export const CheckboxField = ({
  label,
  labelPlacement,
  input,
  meta,
  children,
  showErrorText = true,
  ...rest
}: ISwitchFieldProps & any) => {
  const classes = useCheckboxStyles();

  return (
    <div className={classes.root}>
      <FormControlLabel
        classes={{
          root: classes.formControlLabel,
        }}
        label={
          children || <Typography className={classes.label}>{label}</Typography>
        }
        control={
          <FormControl error={!!meta.error} className={classes.checkbox}>
            <Checkbox color="secondary" {...rest} {...omit(input, 'value')} />
          </FormControl>
        }
      />
      {showErrorText && hasError(meta) && (
        <FormHelperText error={true} classes={{ root: classes.error }}>
          {getErrorText(meta)}
        </FormHelperText>
      )}
    </div>
  );
};
