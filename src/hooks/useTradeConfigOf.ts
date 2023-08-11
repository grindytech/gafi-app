import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from './useRedux';
import { StorageKey, Vec, u32 } from '@polkadot/types';
import { GafiSupportGameTypesPackage } from '@polkadot/types/lookup';

export interface useBundleOfProps {
  filter: 'entries' | number[];
  key: string | string[] | number | number[];
}

export default function useBundleOf({ filter, key }: useBundleOfProps) {
  const { api } = useAppSelector(state => state.substrate);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['bundleOf', key],
    queryFn: async () => {
      if (api) {
        if (filter === 'entries') {
          const service = await api.query.game.tradeConfigOf.entries();

          // Option<PalletGameTradeConfig>
          // trade_id: StorageKey<[u32]>
          return service.map(([trade_id, meta]) => ({
            trade_id: trade_id.args[0].toNumber(),
            trade: meta.value.trade.toString(),
          }));
        }

        if (filter) {
          return Promise.all(
            filter.map(async trade_id => {
              const service: Vec<GafiSupportGameTypesPackage> =
                await api.query.game.bundleOf(trade_id);

              if (service.isEmpty) return;

              return {
                trade_id,
                collection_id: service[0].collection.toNumber(),
                nft_id: service[0].item.toNumber(),
                amount: service[0].amount.toNumber(),
              };
            })
          );
        }
      }

      // not found group
      return [];
    },
    enabled: !!filter,
  });

  return {
    bundleOf: data,
    isLoading,
    isError,
  };
}
