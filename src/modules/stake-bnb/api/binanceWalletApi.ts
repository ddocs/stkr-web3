export interface IBnbAccount {
  id: string;
  name: string;
  icon: string;
  addresses: [
    {
      type: 'bbc-testnet';
      address: string;
    },
    {
      type: 'bbc-mainnet';
      address: string;
    },
    {
      type: 'eth';
      address: string;
    },
  ];
}

export async function getBnbAccounts(): Promise<IBnbAccount[]> {
  return await window.BinanceChain.requestAccounts();
}

export async function getBep2Address(accountId: string) {
  const account = (await getBnbAccounts()).find(item => item.id === accountId);

  if (!account) {
    throw new Error("Account hasn't been found");
  }

  const address = account.addresses.find(item => {
    return item.type === 'bbc-mainnet';
  })?.address;

  if (!address) {
    throw new Error("Address hasn't been found");
  }

  return { address };
}
