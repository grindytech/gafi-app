import React from 'react';
import { useAppSelector } from './useRedux';
import useSignAndSend from './useSignAndSend';
import useSubscribeSystem from './useSubscribeSystem';

interface useSetBuyClamiedProps {
  trade_id: number;
  amount: number;
  price: number;
  refetch?: () => void;
}

export default function useSetBuyClamied({
  trade_id,
  amount,
  price,
  refetch,
}: useSetBuyClamiedProps) {
  const { api } = useAppSelector(state => state.substrate);
  const { account } = useAppSelector(state => state.injected.polkadot);

  const { isLoading, mutation } = useSignAndSend({
    key: ['SetBuyClamied', String(trade_id)],
    address: account?.address as string,
  });

  const { event, setEvent } = useSubscribeSystem('game::SetBuyClaimed');
  React.useEffect(() => {
    if (event && refetch) {
      event.forEach(({ eventValue }) => {
        const [trade] = JSON.parse(eventValue);

        if (trade === trade_id) {
          refetch();
          setEvent([]);
        }
      });
    }
  }, [event]);

  return {
    isLoading,
    mutation: () => {
      if (api) {
        mutation(api.tx.game.claimSetBuy(trade_id, amount, price));
      }
    },
  };
}
