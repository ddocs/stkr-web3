import { Box, MenuItem, MenuList, Popover } from '@material-ui/core';
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { AEthIcon } from '../../../../UiKit/Icons/AEthIcon';
import { BinanceIcon } from '../../../../UiKit/Icons/BinanceIcon';
import { EthIcon } from '../../../../UiKit/Icons/EthIcon';
import { FEthIcon } from '../../../../UiKit/Icons/FEthIcon';
import { Body1, Body2 } from '../../../../UiKit/Typography';
import { useBlockchainPanelStyles } from './BlockchainPanelStyles';

const availableIcons = {
  aEth: AEthIcon,
  fEth: FEthIcon,
  binance: BinanceIcon,
  eth: EthIcon,
};

export type BlockchainPanelIconsType = keyof typeof availableIcons;

export interface IBlockchainPanelProps {
  className?: string;
  disabled?: boolean;
  icon: BlockchainPanelIconsType;
  onChange?: (value: string) => void;
  onClick?: () => void;
  subTitle?: string;
  title: string;
  dropdownItems?: {
    value: string;
    label: string;
    icon: BlockchainPanelIconsType;
  }[];
}

export const BlockchainPanel = ({
  className,
  disabled = false,
  dropdownItems,
  icon,
  onChange,
  onClick,
  subTitle,
  title,
}: IBlockchainPanelProps) => {
  const classes = useBlockchainPanelStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [activeItem, setActiveItem] = useState(
    dropdownItems
      ? {
          ...dropdownItems[0],
        }
      : undefined,
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        return;
      }
      setAnchorEl(event.currentTarget);
      if (typeof onClick === 'function') {
        onClick();
      }
    },
    [disabled, onClick],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const onMenuItemClick = useCallback(
    (value: string) => {
      if (!dropdownItems || value === activeItem?.value) {
        return;
      }
      const selectedItem = dropdownItems.find(item => item.value === value);
      if (typeof onChange === 'function') {
        onChange(value);
      }
      setActiveItem(selectedItem);
      handleClose();
    },
    [activeItem, dropdownItems, handleClose, onChange],
  );

  const isPopoverOpen = Boolean(anchorEl);
  const Icon = availableIcons[activeItem?.icon || icon];

  return (
    <>
      <Box
        className={classNames(
          className,
          classes.root,
          !disabled && classes.clickable,
        )}
        onClick={disabled ? undefined : handleClick}
      >
        <Icon className={classes.icon} />

        <Box>
          {subTitle && <Body2 color="textSecondary">{subTitle}</Body2>}

          <Body1>{activeItem?.label || title}</Body1>
        </Box>
      </Box>

      {dropdownItems && (
        <Popover
          open={isPopoverOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuList className={classes.menu}>
            {dropdownItems.map(({ icon, value, label }) => {
              const MenuIcon = availableIcons[icon];
              const onClick = () => onMenuItemClick(value);

              return (
                <MenuItem
                  key={value}
                  onClick={onClick}
                  selected={value === activeItem?.value}
                  className={classes.menuItem}
                >
                  <MenuIcon />
                  {label}
                </MenuItem>
              );
            })}
          </MenuList>
        </Popover>
      )}
    </>
  );
};
