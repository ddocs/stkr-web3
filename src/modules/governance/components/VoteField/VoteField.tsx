import { Button, SliderProps, Typography } from '@material-ui/core';
import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { getErrorText, hasError } from '../../../../common/utils/form';
import FormHelperText from '@material-ui/core/FormHelperText';
import classNames from 'classnames';
import { t } from '../../../../common/utils/intl';
import { useVoteFieldStyles } from './VoteFieldStyles';
import { VoteStatus } from '@ankr.com/stkr-jssdk';

interface ISliderProps extends FieldRenderProps<HTMLElement>, SliderProps {
  label?: string;
  yes: number;
  no: number;
  disabled: boolean;
}

export const VoteField = ({
  input: { onChange, value, onBlur },
  meta,
  children,
  yes,
  no,
  disabled,
}: ISliderProps) => {
  const error = hasError(meta);
  const errorText = getErrorText(meta);
  const classes = useVoteFieldStyles();

  const handleOnChange = (event: React.ChangeEvent<any>) => {
    onChange(event.currentTarget.value);
  };

  const handleOnBlur = () => {
    onBlur();
  };

  return (
    <>
      <Button
        variant="outlined"
        classes={{
          root: classNames(
            classes.voteButton,
            value === (VoteStatus.YES as any) && classes.active,
          ),
          label: classes.voteButtonLabel,
        }}
        value={VoteStatus.YES}
        onClick={handleOnChange}
        onBlur={handleOnBlur}
        disabled={disabled}
      >
        {t('project.support')}
        <Typography color="textSecondary" className={classes.voteCount}>
          {t('unit.vote-value', { value: yes })}
        </Typography>
      </Button>
      {children}
      <Button
        variant="outlined"
        classes={{
          root: classNames(
            classes.voteButton,
            value === (VoteStatus.NO as any) && classes.active,
          ),
          label: classes.voteButtonLabel,
        }}
        value={VoteStatus.NO}
        onClick={handleOnChange}
        onBlur={handleOnBlur}
        disabled={disabled}
      >
        {t('project.against')}
        <Typography color="textSecondary" className={classes.voteCount}>
          {t('unit.vote-value', {
            value: no,
          })}
        </Typography>
      </Button>
      {error && <FormHelperText error={true}>{errorText}</FormHelperText>}
    </>
  );
};
