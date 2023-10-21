import { useQuery } from '@tanstack/react-query';

import { useSubstrateContext } from 'contexts/contexts.substrate';
import { useEffect } from 'react';
import { TypeMetaGame } from 'types/meta.type.ts';

export interface useMetaGameProps {
  filter: 'entries' | 'game_id';
  arg?: number[];
  key: string | string[] | number | number[];
  async?: boolean;
}

interface MetaGameFieldProps extends TypeMetaGame {
  game_id: number;
}

export default ({ filter, arg, key, async }: useMetaGameProps) => {
  const { api } = useSubstrateContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`gameMetadataOf`, key],
    queryFn: async () => {
      if (api) {
        if (filter === 'entries') {
          const service = await api.query.game.gameMetadataOf.entries();

          return service.map(([game_id, meta]) => {
            const metadata = JSON.parse(
              String(meta.value.data.toHuman())
            ) as TypeMetaGame;

            return {
              ...metadata,
              game_id: game_id.args[0].toNumber(),
            } as MetaGameFieldProps;
          });
        }

        if (filter === 'game_id' && arg) {
          return Promise.all(
            arg.map(async game_id => {
              const service = await api.query.game.gameMetadataOf(game_id);

              if (service.isEmpty) return;

              const metadata = JSON.parse(
                String(service.value.data.toHuman())
              ) as TypeMetaGame;

              return {
                ...metadata,
                game_id,
              } as MetaGameFieldProps;
            })
          ).then(data =>
            data.filter((meta): meta is MetaGameFieldProps => !!meta)
          );
        }
      }

      // not found group
      return [];
    },
    enabled: !!filter,
  });

  useEffect(() => {
    if (async && !isLoading) {
      refetch();
    }
  }, [isLoading]);

  return {
    MetaGame: data,
    isLoading,
  };
};
