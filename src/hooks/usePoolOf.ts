import { useQuery } from '@tanstack/react-query';

import { Option, StorageKey, u32 } from '@polkadot/types';
import { PalletGamePoolDetails } from '@polkadot/types/lookup';
import { useSubstrateContext } from 'contexts/contexts.substrate';

export interface poolOfProps {
  pool_id: number;
  poolType: string;
  owner: string;
  price: string;
  endBlock: Option<u32>;
}

export interface usePoolOfProps {
  filter: 'entries' | 'pool_id';
  arg?: number[];
  key: string | string[] | number | number[];
}

export default ({ filter, arg, key }: usePoolOfProps) => {
  const { api } = useSubstrateContext();

  const { data, isLoading } = useQuery({
    queryKey: ['poolOf', key],
    queryFn: async () => {
      if (api) {
        if (filter === 'entries') {
          const service = await api.query.game.poolOf.entries();

          return service.map(
            ([pool_id, meta]: [
              StorageKey<[u32]>,
              Option<PalletGamePoolDetails>
            ]) => {
              return {
                pool_id: pool_id.args[0].toNumber(),
                poolType: meta.value.poolType.toString(),
                owner: meta.value.owner.toString(),
                price: meta.value.mintSettings.price.toString(),
                endBlock: meta.value.mintSettings.endBlock,
              };
            }
          ) as poolOfProps[];
        }

        if (filter === 'pool_id' && arg) {
          return Promise.all(
            arg.map(async pool_id => {
              const service = (await api.query.game.poolOf(
                pool_id
              )) as Option<PalletGamePoolDetails>;

              if (service.isEmpty) return;

              return {
                pool_id,
                poolType: service.value.poolType.toString(),
                owner: service.value.owner.toString(),
                price: service.value.mintSettings.price.toString(),
                endBlock: service.value.mintSettings.endBlock,
              };
            })
          ).then(data => data.filter((meta): meta is poolOfProps => !!meta));
        }
      }

      // not found group
      return [];
    },
    enabled: !!api?.query.game.poolOf || !!arg,
  });

  return {
    poolOf: data,
    isLoading,
  };
};
