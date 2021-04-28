/* eslint-disable import/no-anonymous-default-export */
import { Box } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React, { useEffect, useState } from 'react';
import { Blockchain } from '../../common/types';
import { t } from '../../common/utils/intl';
import { useInterval } from '../../common/utils/useInterval';
import { Curtains } from '../../UiKit/Curtains';
import { Available } from './components/Available';
import { Bridge } from './components/Bridge';
import { BridgeForm, IBridgeFormValues } from './components/BridgeForm';
import { History, ITxnHistory } from './components/History';
import { Progress } from './components/Progress';
import { BlockchainIcons } from './const';

export default {
  title: 'modules/CrossChainBridge',
};

const historyItems: ITxnHistory[] = [
  {
    from: {
      icon: BlockchainIcons.binance,
      address: '0xaa25Aa7a19f9c426E07dee59b12f944f4d9f1DD3',
    },
    to: {
      icon: BlockchainIcons.eth,
      address: '0x0Ffef93Fcba21e53E8d5C8b2ca68D64BAA29c915',
    },
    amount: 0.66,
    amountType: 'aETH',
    date: new Date(),
    isReady: true,
  },
  {
    from: {
      icon: BlockchainIcons.eth,
      address: '0x0Ffef93Fcba21e53E8d5C8b2ca68D64BAA29c915',
    },
    to: {
      icon: BlockchainIcons.binance,
      address: '0xaa25Aa7a19f9c426E07dee59b12f944f4d9f1DD3',
    },
    amount: 5,
    amountType: 'aETH',
    date: new Date(),
    isReady: false,
  },
];

const useConnectDemo = () => {
  const [isConnected, setIsConnected] = useState(false);
  const onOpenDialog = () => setIsConnected(true);

  return {
    isConnected,
    onOpenDialog,
  };
};

const useBridgeDemo = () => {
  const [isTxnInProgress, setTxnInProgress] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [amount, setAmount] = useState<string | number>(0);
  const [address, setAddress] = useState('');
  const [assetType, setAssetType] = useState('aETH');

  const [fromBlockchain, setFromBlockchain] = useState(Blockchain.ethereum);
  const [toBlockchain, setToBlockchain] = useState(Blockchain.binance);
  const onSwapClick = () => {
    setFromBlockchain(toBlockchain);
    setToBlockchain(fromBlockchain);
  };

  const onSubmit = (values: IBridgeFormValues) => {
    console.log(values);
    setAmount(values.amount);
    setAddress(values.address);
    setIsSubmited(true);
  };

  const onAssetChange = (value: string) => setAssetType(value);

  useEffect(() => {
    if (isSubmited) {
      setTimeout(() => {
        setTxnInProgress(true);
      }, 3 * 1000);
    }
  }, [isSubmited]);

  const onClaimClick = () => {
    console.log('dsad');
  };

  return {
    onSubmit,
    isSubmited,
    isTxnInProgress,
    onSwapClick,
    fromBlockchain,
    toBlockchain,
    amount,
    address,
    onAssetChange,
    assetType,
    onClaimClick,
  };
};

const useProgressDemo = (isInProgress: boolean) => {
  const [isTxnCompleted, setTxnCompleted] = useState(false);
  const [blocks, setBlocks] = useState(1);
  const [timeLeft, setTimeLeft] = useState(9);
  const [iterationCount, setIterationCount] = useState(1);
  const totalBlocks = 24;
  const interval = !isInProgress || isTxnCompleted ? undefined : 1.5 * 1000;

  const statusText = isTxnCompleted
    ? 'Please switch your wallet network to BSC to claim tokens'
    : `${blocks}/${totalBlocks} blocks completed (~${timeLeft} min left)`;

  useInterval(() => {
    const updatedBlocks = (totalBlocks / 3) * iterationCount;
    setBlocks(updatedBlocks);
    setTimeLeft(value => value - 3);
    setIterationCount(value => value + 1);

    if (updatedBlocks === totalBlocks) {
      setTxnCompleted(true);
    }
  }, interval);

  return {
    statusText,
    isTxnCompleted,
  };
};

const useResultsDemo = (isTxnCompleted: boolean) => {
  const [isResultsShowed, setResultsShowed] = useState(false);

  useEffect(() => {
    if (isTxnCompleted) {
      setTimeout(() => {
        setResultsShowed(true);
      }, 2 * 1000);
    }
  }, [isTxnCompleted]);

  return { isResultsShowed };
};

const DefaultStory = () => {
  const { isConnected, onOpenDialog } = useConnectDemo();

  const {
    onSubmit,
    isSubmited,
    isTxnInProgress,
    onSwapClick,
    fromBlockchain,
    toBlockchain,
    amount,
    address,
    onAssetChange,
    assetType,
    onClaimClick,
  } = useBridgeDemo();

  const { statusText, isTxnCompleted } = useProgressDemo(isTxnInProgress);

  const { isResultsShowed } = useResultsDemo(isTxnCompleted);

  const renderedBridge = (
    <Bridge
      onSwapClick={onSwapClick}
      onConnectClick={onOpenDialog}
      isConnected={isConnected}
      onAssetChange={onAssetChange}
      toBlockchain={toBlockchain}
      fromBlockchain={fromBlockchain}
      form={
        <BridgeForm
          onSubmit={onSubmit}
          balance={new BigNumber(12.4)}
          submitDisabled={isSubmited}
          balanceType={assetType}
          additionalText={
            isSubmited ? t('transaction-completed.notice') : undefined
          }
        />
      }
    />
  );

  const renderedProgress = (
    <Progress
      subTitle={statusText}
      amount={amount}
      amountType={assetType}
      address={address}
      isCompleted={isTxnCompleted}
    />
  );

  const renderedResults = (
    <>
      <Box mb={{ xs: 7, sm: 10 }}>
        <Available
          value="10"
          network="BSC"
          onClaimClick={() => {
            console.log('click');
          }}
        />
      </Box>

      <History onClick={onClaimClick} items={historyItems} />
    </>
  );

  const showResults = isResultsShowed;
  const showProgress = !showResults && (isTxnInProgress || isTxnCompleted);
  const showBridge = !showProgress && !showResults;

  return (
    <section>
      <Curtains>
        {showBridge && renderedBridge}
        {showProgress && renderedProgress}
        {showResults && renderedResults}
      </Curtains>
    </section>
  );
};

export const Default = () => <DefaultStory />;
