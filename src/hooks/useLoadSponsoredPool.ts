import { GafiPrimitivesTicketTicketInfo } from '@polkadot/types/lookup';
import { stringToHex } from '@polkadot/util';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useQueryParam } from 'use-query-params';

import { useSearchPoolContext } from 'contexts/searchPoolContext/searchPoolContext';
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
  const { searchPoolValue } = useSearchPoolContext();

  const handlePoolFilter = () => {
    if (isOwned)
      return {
        poolOwner: { equalTo: currentAccount?.address },
      };

    if (searchPoolValue.submit)
      return {
        poolName: { includes: stringToHex(searchPoolValue?.submit) },
      };

    return undefined;
  };

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
      offset: (currentPage - 1) * constants.SPONSORED_POOL_AMOUNT_PER_PAGE,
      filter: handlePoolFilter(),
    },
    {
      enabled: !!currentAccount,
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
    setCurrentPage(1);
  }, [searchPoolValue.submit]);

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
