import { useQuery } from '@tanstack/react-query';
import { StorageKey, u32 } from '@polkadot/types';
import { Codec } from '@polkadot/types/types';
import { useSubstrateContext } from 'contexts/contexts.substrate';

export interface SupplyOfProps {
  collection_id: number;
  nft_id: number;
  supply: string | null;
}

interface useSupplyOfProps {
  filter?: 'entries' | 'collection_id' | 'nft_id';
  arg?: number[] | number[][];
  key: string | string[] | number | number[];
}

export default function useSupplyOf({ filter, key, arg }: useSupplyOfProps) {
  const { api } = useSubstrateContext();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['supplyOf', key],
    queryFn: async () => {
      if (api) {
        if (filter === 'entries') {
          const service = await api.query.game.supplyOf.entries();

          return service.map(([meta, supply]) => {
            return {
              collection_id: meta.args[0].toNumber(),
              nft_id: meta.args[1].toNumber(),
              supply: supply.toHuman(),
            };
          }) as unknown as SupplyOfProps[];
        }

        if (filter === 'collection_id' && arg) {
          return Promise.all(
            arg.map(async collection_id => {
              const service = await api.query.game.supplyOf.entries(
                collection_id
              );

              return service.map(
                ([key, supply]: [StorageKey<[u32, u32]>, Codec]) => {
                  return {
                    collection_id: key.args[0].toNumber(),
                    nft_id: key.args[1].toNumber(),
                    supply: supply.toHuman(),
                  };
                }
              );
            })
          ).then(data => data.filter(meta => !!meta).flat() as SupplyOfProps[]);
        }

        if (filter === 'nft_id' && arg) {
          return Promise.all(
            arg.map(async argument => {
              const [collection_id, nft_id] = argument as any;

              const service = await api.query.game.supplyOf(
                collection_id,
                nft_id
              );

              // not found
              if (service.isEmpty) return;

              return {
                collection_id,
                nft_id,
                supply: service.toHuman(),
              };
            })
          ).then(data => data.filter((meta): meta is SupplyOfProps => !!meta));
        }
      }

      return []; // not found
    },
    enabled: !!api?.query.game.supplyOf || !!arg,
  });

  return {
    supplyOf: data,
    isError,
    isLoading,
  };
}
