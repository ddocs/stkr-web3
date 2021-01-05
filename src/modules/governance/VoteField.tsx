import { Button, SliderProps, Typography } from '@material-ui/core';
import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { getErrorText, hasError } from '../../common/utils/form';
import FormHelperText from '@material-ui/core/FormHelperText';
import classNames from 'classnames';
import { t } from '../../common/utils/intl';
import { useVoteFieldStyles } from './VoteFieldStyles';
import { VoteStatus } from '@ankr.com/stkr-jssdk';

interface ISliderProps extends FieldRenderProps<HTMLElement>, SliderProps {
  label?: string;
}

export const VoteField = ({
  input: { onChange, value, onBlur },
  meta,
  children,
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
      >
        {t('project.support')}
        <Typography color="textSecondary" className={classes.voteCount}>
          {t('units.vote-value', { value: '670000' })}
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
      >
        {t('project.against')}
        <Typography color="textSecondary" className={classes.voteCount}>
          {t('units.vote-value', {
            value: '622000',
          })}
        </Typography>
      </Button>
      {error && <FormHelperText error={true}>{errorText}</FormHelperText>}
    </>
  );
};
