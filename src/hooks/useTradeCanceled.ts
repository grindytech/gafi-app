import React from 'react';
import { useAppSelector } from './useRedux';
import useSignAndSend from './useSignAndSend';
import useSubscribeSystem from './useSubscribeSystem';
import { GafiSupportGameTypesTradeType } from '@polkadot/types/lookup';

interface useTradeCanceledProps {
  refetch?: () => void;
  type: GafiSupportGameTypesTradeType['type'];
  trade_id: number;
}

export default function useTradeCanceled({
  trade_id,
  type,
  refetch,
}: useTradeCanceledProps) {
  const { api } = useAppSelector(state => state.substrate);
  const { account } = useAppSelector(state => state.injected.polkadot);

  const { isLoading, mutation } = useSignAndSend({
    key: [type, String(trade_id)],
    address: account?.address as string,
  });

  const { event, setEvent } = useSubscribeSystem('game::TradeCanceled');

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
        mutation(api.tx.game.cancelTrade(trade_id, type));
      }
    },
  };
}
