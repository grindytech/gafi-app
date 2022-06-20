import { u128 } from '@polkadot/types';
import { formatBalance } from '@polkadot/util';
import { useCallback, useEffect, useState } from 'react';

import { acctAddr } from 'components/utils';
import { useSubstrateState } from 'substrate-lib';

export const usePolkadotBalance = () => {
  const { api, currentAccount, chainDecimal } = useSubstrateState();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<u128>();

  const fetchPolkadotBalance = useCallback(async () => {
    setIsLoading(true);
    let unsubscribe: any;
    if (currentAccount)
      unsubscribe = await api?.query.system.account(
        acctAddr(currentAccount),
        res => {
          setResponse(res.data.free);
        }
      );
    setIsLoading(false);
    return () => unsubscribe && unsubscribe();
  }, [api, currentAccount]);

  useEffect(() => {
    fetchPolkadotBalance();
  }, [fetchPolkadotBalance]);

  return {
    polkadotBalance: response,
    polkadotFormatedBalance: formatBalance(
      response,
      { withSi: false, forceUnit: '-' },
      chainDecimal
    ),
    isLoading,
  };
};
