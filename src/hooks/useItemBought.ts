import React from 'react';
import { useAppSelector } from './useRedux';
import useSignAndSend from './useSignAndSend';
import useSubscribeSystem from './useSubscribeSystem';

interface useItemBoughtProps {
  trade_id: number;
  amount: number;
  bidPrice: number;
  refetch?: () => void;
}

export default function useItemBought({
  trade_id,
  amount,
  bidPrice,
  refetch,
}: useItemBoughtProps) {
  const { api } = useAppSelector(state => state.substrate);
  const { account } = useAppSelector(state => state.injected.polkadot);

  const { isLoading, mutation } = useSignAndSend({
    key: ['item_bought', String(trade_id)],
    address: account?.address as string,
  });

  const { event, setEvent } = useSubscribeSystem('game::ItemBought');
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
        mutation(api.tx.game.buyItem(trade_id, amount, bidPrice));
      }
    },
  };
}
