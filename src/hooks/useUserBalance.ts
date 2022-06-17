import { formatBalance } from '@polkadot/util';
import { useQuery } from 'react-query';

import { acctAddr } from 'components/utils';
import { useSubstrateState } from 'substrate-lib';

export const usePolkadotBalance = () => {
  const { api, currentAccount, chainDecimal } = useSubstrateState();
  const fetcher = async () => {
    let response;
    if (currentAccount)
      response = await api?.query.system.account(acctAddr(currentAccount));
    return formatBalance(
      response?.data.free,
      { withSi: false, forceUnit: '-' },
      chainDecimal
    );
  };

  const { data, refetch, isLoading, ...response } = useQuery(
    ['loading-contract', currentAccount],
    fetcher,
    {
      enabled: !!currentAccount,
    }
  );
  return {
    pokadotBalance: data,
    refetch,
    isLoading,
    ...response,
  };
};
