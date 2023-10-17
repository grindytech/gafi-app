import { useQuery } from '@tanstack/react-query';
import { useSubstrateContext } from 'contexts/contexts.substrate';

export interface ItemBalanceOfProps {
  owner: string;
  collection_id: number;
  nft_id: number;
  amount: string;
}

export interface useItemBalanceOfProps {
  filter?: 'entries' | 'address';
  arg?: string[];
  key: string | string[] | number | number[];
}

export default function useItemBalanceOf({
  filter,
  arg,
  key,
}: useItemBalanceOfProps) {
  const { api } = useSubstrateContext();

  const { data, isLoading } = useQuery({
    queryKey: ['itemBalanceOf', key],
    queryFn: async () => {
      if (api) {
        if (filter === 'entries') {
          const service = await api.query.game.itemBalanceOf.entries();

          return service.map(([option, meta]) => {
            return {
              owner: option.args[0].toString(),
              collection_id: option.args[1].toNumber(),
              nft_id: option.args[2].toNumber(),
              amount: meta.toHuman() as string,
            };
          }) as ItemBalanceOfProps[];
        }

        if (filter === 'address' && arg) {
          return Promise.all(
            arg.map(async address => {
              const service = await api.query.game.itemBalanceOf.entries(
                address
              );

              return service.map(([option, meta]) => {
                return {
                  owner: option.args[0].toString(),
                  collection_id: option.args[1].toNumber(),
                  nft_id: option.args[2].toNumber(),
                  amount: meta.toHuman() as string,
                };
              });
            })
          ).then(meta => meta.flat() as ItemBalanceOfProps[]);
        }
      }

      // not found group
      return [];
    },
    enabled: !!api?.query.game || !!arg,
  });

  return {
    itemBalanceOf: data,
    isLoading,
  };
}
