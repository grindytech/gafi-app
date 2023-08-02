import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from './useRedux';
import { Option, u32 } from '@polkadot/types';
import { PalletGamePoolDetails } from '@polkadot/types/lookup';

export interface usePoolOfProps {
  key?: string;
  group: { pool_id: number }[] | undefined;
}

interface gamePoolOfProps {
  owner: string;
  price: string;
  endBlock: Option<u32> | null;
}

export default function usePoolOf({ key, group }: usePoolOfProps) {
  const { api } = useAppSelector(state => state.substrate);

  const { data } = useQuery({
    queryKey: [`game_poolof/${key}`],
    queryFn: async () => {
      if (api && group?.length) {
        const response = Promise.all(
          group.map(async ({ pool_id }) => {
            const service: Option<PalletGamePoolDetails> =
              await api.query.game.poolOf(pool_id);

            return {
              owner: service.value.owner.toString(),
              price: service.value.mintSettings.price.toString(),
              endBlock: service.value.mintSettings.endBlock,
            };
          })
        ).then(meta => meta.pop());

        return response;
      }

      // not found group
      return [];
    },
    enabled: !!group,
  });

  return {
    getPoolOf: data as gamePoolOfProps | undefined,
  };
}
