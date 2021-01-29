import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { uid } from 'react-uid';
import { useLocaleOptions } from '../../../../common/hooks/useLocaleOptions';
import { useLocaleLinksStyles } from './LocaleLinksStyles';

interface ILocaleLinksProps {
  className?: string;
}

export const LocaleLinks = ({ className }: ILocaleLinksProps) => {
  const classes = useLocaleLinksStyles();
  const { localeOptions, initialLocale, setLocale } = useLocaleOptions();

  const items = useMemo(
    () =>
      localeOptions.map(({ value, label }) => {
        const isActive = initialLocale === value;
        const onClick = () => {
          if (!isActive) {
            setLocale(value);
          }
        };

        return (
          <button
            className={classNames(classes.item, isActive && classes.itemActive)}
            key={uid({ value, label })}
            onClick={onClick}
          >
            {label}
          </button>
        );
      }),
    [classes, initialLocale, localeOptions, setLocale],
  );

  return (
    <div className={classNames(classes.root, className)}>
      <Typography color="textSecondary" className={classes.label}>
        Language
      </Typography>

      <div className={classes.list}>{items}</div>
    </div>
  );
};
