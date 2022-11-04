import { useMemo, useState } from 'react';

import { ClaimedContract } from '../graphQL/generates';

import { useSubstrateState } from 'contexts/substrateContext';
import client from 'graphQL/client';
import { useClaimedContractsQuery } from 'graphQL/generates';
import * as constants from 'utils/constants';

const useLoadContracts = () => {
  const { currentAccount } = useSubstrateState();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: claimedContractsData,
    isLoading,
    refetch,
  } = useClaimedContractsQuery(
    client,
    {
      first: constants.CONTRACT_AMOUNT_PER_PAGE,
      offset: (currentPage - 1) * constants.CONTRACT_AMOUNT_PER_PAGE,
      filter: { accountId: { equalTo: currentAccount?.address } },
    },
    {
      enabled: !!currentAccount?.addressRaw,
      staleTime: 60000,
    }
  );

  const claimedContracts = useMemo(
    () =>
      claimedContractsData
        ? (claimedContractsData.claimedContracts?.nodes as ClaimedContract[])
        : [],
    [claimedContractsData]
  );

  const totalCount = claimedContractsData?.claimedContracts
    ?.totalCount as number;

  return {
    listContract: claimedContracts,
    currentPage,
    setCurrentPage,
    refetch,
    isLoading,
    totalCount,
  };
};

export default useLoadContracts;
