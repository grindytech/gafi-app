import { GafiPrimitivesTicketTicketInfo } from '@polkadot/types/lookup';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useQueryParam } from 'use-query-params';

import { useSubstrateState } from 'contexts/substrateContext';
import client from 'graphQL/client';
import { SponsoredPool, useSponsoredPoolsQuery } from 'graphQL/generates';
import * as constants from 'utils/constants';

const useLoadSponsoredPool = () => {
  const { api, currentAccount } = useSubstrateState();
  const [type, _] = useQueryParam('type');
  const isOwned = type === 'owned';

  const [currentPage, setCurrentPage] = useState(1);
  const [joinedPool, setJoinedPool] = useState<SponsoredPool | undefined>();

  const { data: joinedPoolInfo, refetch } = useQuery(
    ['getJoinedPool', currentAccount],
    async (): Promise<GafiPrimitivesTicketTicketInfo[] | undefined> => {
      if (api && currentAccount) {
        const res = await api.query.pool.tickets.entries(
          currentAccount.address
        );

        return res.map(([{}, exposure]) => exposure.unwrap());
      }
    },
    {
      enabled: !!currentAccount,
    }
  );

  const { data: sponsoredPoolData, isLoading } = useSponsoredPoolsQuery(
    client,
    {
      first: constants.SPONSORED_POOL_AMOUNT_PER_PAGE,
      offset: isOwned
        ? 0
        : (currentPage - 1) * constants.SPONSORED_POOL_AMOUNT_PER_PAGE,
      filter: isOwned
        ? {
            poolOwner: {
              equalTo: currentAccount?.address,
            },
          }
        : undefined,
    },
    {
      enabled: !!currentAccount?.address,
    }
  );

  const sponsoredPools = sponsoredPoolData
    ? (sponsoredPoolData.sponsoredPools?.nodes as SponsoredPool[])
    : [];

  const totalCount = sponsoredPoolData?.sponsoredPools?.totalCount as number;

  const isJoinedPool = !!joinedPoolInfo?.map(
    item => item.ticketType.isSponsored && item.ticketType.asSponsored.toHuman()
  ).length;

  useEffect(() => {
    joinedPoolInfo?.map(pool => {
      if (pool.ticketType.isSponsored) {
        const joinedPoolID = pool.ticketType.asSponsored.toHuman();
        const foundPool = sponsoredPools.find(
          nodes => nodes.id === joinedPoolID
        );

        setJoinedPool(foundPool);
      } else {
        setJoinedPool(undefined);
      }
    });
  }, [joinedPoolInfo, sponsoredPools]);

  return {
    joinedPoolInfo,
    isJoinedPool,
    isOwned,
    sponsoredPools,
    totalCount,
    setCurrentPage,
    currentPage,
    isLoading,
    refetch,
    joinedPool,
  };
};

export default useLoadSponsoredPool;
