import { Bytes, u128 } from '@polkadot/types';
import { ITuple } from '@polkadot/types/types';
import { useCallback, useEffect, useState } from 'react';

import { useSubstrateState } from 'contexts/substrateContext';

export const useWhitelistSource = (poolId: string) => {
  const { api } = useSubstrateState();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ITuple<[Bytes, u128]> | undefined>();

  const fetchWhitelistSource = useCallback(async () => {
    setIsLoading(true);
    const unsubscribe = await api?.query.palletWhitelist.whitelistSource(
      poolId,
      res => {
        if (res.isSome) {
          setResponse(res.unwrap());
        }
      }
    );
    setIsLoading(false);
    return () => unsubscribe && unsubscribe();
  }, [api?.query.palletWhitelist, poolId]);

  useEffect(() => {
    fetchWhitelistSource();
  }, [fetchWhitelistSource]);

  return {
    response,
    isLoading,
  };
};
