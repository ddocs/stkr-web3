/* eslint-disable import/no-anonymous-default-export */
import { Box, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { AAvaxBIcon } from './AAvaxBIcon';
import { AEthIcon } from './AEthIcon';
import { AvaxIcon } from './AvaxIcon';
import { BinanceIcon } from './BinanceIcon';
import { BnbIcon } from './BnbIcon';
import { CancelIcon } from './CancelIcon';
import { CloseIcon } from './CloseIcon';
import { CopiedIcon } from './CopiedIcon';
import { CopyIcon } from './CopyIcon';
import { EthIcon } from './EthIcon';
import { FEthIcon } from './FEthIcon';
import { MetaMaskIcon } from './MetaMaskIcon';
import { MinusIcon } from './MinusIcon';
import { PlusIcon } from './PlusIcon';
import { QuestionIcon } from './QuestionIcon';
import { ToggleIcon } from './ToggleIcon';
import { ViewIcon } from './ViewIcon';

export default {
  title: 'UiKit/Icons',
};

const useStyles = makeStyles<Theme>(theme => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(2, 2),
  },
}));

const DefaultStory = () => {
  return <CancelIcon size="xmd" />;
};

export const Default = () => <DefaultStory />;

const iconsMap = {
  aEth: AEthIcon,
  binance: BinanceIcon,
  cancel: CancelIcon,
  close: CloseIcon,
  copied: CopiedIcon,
  copy: CopyIcon,
  eth: EthIcon,
  fEth: FEthIcon,
  question: QuestionIcon,
  toggle: ToggleIcon,
  view: ViewIcon,
  metamask: MetaMaskIcon,
  avax: AvaxIcon,
  aAvaxB: AAvaxBIcon,
  plus: PlusIcon,
  minus: MinusIcon,
  bnb: BnbIcon,
};

const icons = Object.keys(iconsMap) as Array<keyof typeof iconsMap>;

const ListStory = () => {
  const classes = useStyles();

  const renderedIcons = icons.map(key => {
    const Icon = iconsMap[key];
    return (
      <Box key={key} display="flex" alignItems="center">
        <Icon key={key} size="xmd" />
        <Box ml={2}>{key}</Box>
      </Box>
    );
  });

  return (
    <>
      <h1>Icons list</h1>
      <div className={classes.grid}>{renderedIcons}</div>
    </>
  );
};

export const List = () => <ListStory />;
