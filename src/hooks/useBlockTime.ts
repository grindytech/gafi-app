import React from 'react';
import { useAppSelector } from './useRedux';

export type TypeUseBlockTime = 'bestNumberFinalized' | 'bestNumber';

export default function useBlockTime(number: TypeUseBlockTime) {
  const { api } = useAppSelector(state => state.substrate);

  const chainBlock = api?.derive.chain[number];
  const [blockNumber, setBlockNumber] = React.useState(0);

  React.useEffect(() => {
    const subscribe = () => {
      if (chainBlock) {
        chainBlock(number => setBlockNumber(number.toNumber()));
      }
    };

    subscribe();

    return () => subscribe();
  }, [blockNumber]);

  return {
    blockNumber,
  };
}
