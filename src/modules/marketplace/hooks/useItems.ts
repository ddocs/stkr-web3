import { useQuery } from '@redux-requests/react';
import { MarketplaceActions } from '../marketplaceActions';
import { AuctionState, ITradeItem } from '../api/getPools';

export function useItems() {
  const {
    data: dataPools,
    loading: loadingPools,
    pristine: pristinePools,
  } = useQuery({
    type: MarketplaceActions.fetchPools.toString(),
    action: MarketplaceActions.fetchPools,
  });
  const {
    data: dataItems,
    loading: loadingItems,
    pristine: pristineItems,
  } = useQuery({
    type: MarketplaceActions.fetchItems.toString(),
    action: MarketplaceActions.fetchItems,
  });

  const pristine = pristinePools || pristineItems;
  const loading = loadingPools || loadingItems || pristine;

  if (!dataPools || !dataItems) {
    return { data: null, loading };
  }

  const tradePools: ITradeItem[] = dataPools.tradePools.filter(
    item => item.state !== AuctionState.Done,
  );

  // TODO Remove zero pull filtering
  const tradeAuctions: ITradeItem[] = dataPools.tradeAuctions.filter(
    item => item.state !== AuctionState.Done && item.poolId !== 0,
  );

  const pools = [...tradePools, ...tradeAuctions];

  return {
    data: dataItems
      .filter(poolInfo => !!pools.find(pool => poolInfo.id === pool.tokenId))
      .map(poolInfo => {
        const pool = pools.find(pool => poolInfo.id === pool.tokenId)!;

        return {
          ...poolInfo,
          poolType: pool.poolType,
          poolId: pool.poolId,
          price: pool.price,
          createTime: pool.createTime,
          token1: pool.token1,
        };
      }),
    loading,
  };
}
