import React from 'react';
import { useAppSelector } from './useRedux';

export default function useBlockTime(
  number: 'bestNumberFinalized' | 'bestNumber'
) {
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
