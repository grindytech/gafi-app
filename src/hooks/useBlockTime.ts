import { useSubstrateContext } from 'contexts/contexts.substrate';
import React from 'react';

export type TypeUseBlockTime = 'bestNumberFinalized' | 'bestNumber';

export default function useBlockTime(number: TypeUseBlockTime) {
  const { api } = useSubstrateContext();

  const chainBlock = api?.derive.chain[number];

  const [blockNumber, setBlockNumber] = React.useState(0);

  React.useEffect(() => {
    const subscribe = () => {
      if (chainBlock && api.isConnected) {
        chainBlock(number => setBlockNumber(number.toNumber()));
      }
    };

    subscribe();

    return () => subscribe();
  }, [blockNumber, api]);

  return {
    blockNumber,
  };
}
