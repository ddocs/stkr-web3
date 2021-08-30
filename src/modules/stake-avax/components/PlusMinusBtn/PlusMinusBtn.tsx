import { IconButton, Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { Spinner } from '../../../../components/Spinner';
import { MinusIcon } from '../../../../UiKit/Icons/MinusIcon';
import { PlusIcon } from '../../../../UiKit/Icons/PlusIcon';
import { usePlusMinusBtnStyles } from './usePlusMinusBtnStyles';

const iconsMap = {
  plus: PlusIcon,
  minus: MinusIcon,
};

type IconNameType = keyof typeof iconsMap;

interface IPlusMinusBtnProps {
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  tooltip?: string;
  icon?: IconNameType;
  disabled?: boolean;
}

export const PlusMinusBtn = ({
  className,
  tooltip,
  onClick,
  icon = 'plus',
  isLoading = false,
  disabled = false,
}: IPlusMinusBtnProps) => {
  const classes = usePlusMinusBtnStyles();

  const Icon = iconsMap[icon];

  return (
    <Tooltip
      title={tooltip || false}
      classes={{
        arrow: classes.tooltipArrow,
        tooltip: classes.tooltip,
      }}
      arrow
      open={tooltip ? undefined : false}
    >
      <IconButton
        size="medium"
        color="secondary"
        className={classNames(classes.root, className)}
        onClick={isLoading ? undefined : onClick}
        disabled={disabled}
      >
        {isLoading ? <Spinner size={24} /> : <Icon size={20} />}
      </IconButton>
    </Tooltip>
  );
};
