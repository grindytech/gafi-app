
import { stringToHex } from '@polkadot/util';
import { useSearchPoolContext } from 'contexts/searchPoolContext/searchPoolContext';
import { useEffect, useMemo, useState } from 'react';
import { useQueryParam } from 'use-query-params';

import useJoinedPoolInfo from './useJoinedPoolInfo';


import { useSubstrateState } from 'contexts/substrateContext';
import client from 'graphQL/client';
import { SponsoredPool, useSponsoredPoolsQuery } from 'graphQL/generates';
import * as constants from 'utils/constants';

const useLoadSponsoredPool = () => {
  const { currentAccount } = useSubstrateState();
  const [type, _] = useQueryParam('type');
  const isOwned = type === 'owned';

  const [currentPage, setCurrentPage] = useState(1);

  const [joinedPool, setJoinedPool] = useState<SponsoredPool[] | undefined>();

  const { isJoinedPool, joinedPoolInfo, refetch } = useJoinedPoolInfo();

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

  const sponsoredPools = useMemo(
    () =>
      sponsoredPoolData
        ? (sponsoredPoolData.sponsoredPools?.nodes as SponsoredPool[])
        : [],
    [sponsoredPoolData]
  );

  const totalCount = sponsoredPoolData?.sponsoredPools?.totalCount as number;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchPoolValue.submit]);

  useEffect(() => {
    joinedPoolInfo?.forEach(pool => {
      if (pool.ticketType.isSponsored) {
        const joinedPoolID = pool.ticketType.asSponsored.toHuman();
        const foundPool = sponsoredPools.find(
          nodes => nodes.id === joinedPoolID
        );

        if (foundPool) {
          setJoinedPool(prevState => {
            if (prevState) {
              return [...prevState, foundPool];
            }
            return [foundPool];
          });
        }
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
