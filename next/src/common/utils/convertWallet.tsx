export const walletConversion = (wallet: string): string => {
  if (wallet.length <= 11) {
    return wallet;
  }
  const newWallet = wallet.split('');
  const firstPart = newWallet.slice(0, 5).join('');
  const lastPart = newWallet
    .slice(newWallet.length - 3, newWallet.length)
    .join('');
  return firstPart + '...' + lastPart;
};
