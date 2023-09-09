import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from './useRedux';
import { TypeMetadataOfGame } from 'types';
import { Option, StorageKey, u32 } from '@polkadot/types';
import { PalletNftsCollectionMetadata } from '@polkadot/types/lookup';

export interface useMetaGameProps {
  filter: 'entries' | 'game_id';
  arg?: number[];
  key: string | string[] | number | number[];
}

interface MetaGameFieldProps extends TypeMetadataOfGame {
  game_id: number;
}

export default ({ filter, arg, key }: useMetaGameProps) => {
  const { api } = useAppSelector(state => state.substrate);

  const { data, isLoading } = useQuery({
    queryKey: [`gameMetadataOf`, key],
    queryFn: async () => {
      if (api) {
        if (filter === 'entries') {
          const service = await api.query.game.gameMetadataOf.entries();

          return service.map(
            ([game_id, meta]: [
              StorageKey<[u32]>,
              Option<PalletNftsCollectionMetadata>
            ]) => {
              const metadata = JSON.parse(
                String(meta.value.data.toHuman())
              ) as TypeMetadataOfGame;

              return {
                title: metadata.title || 'unknown',
                categories: metadata.categories || 'unknown',
                description: metadata.description || 'unknown',
                website: metadata.website || 'unknown',
                twitter: metadata.twitter || 'unknown',
                discord: metadata.discord || 'unknown',
                avatar: metadata.avatar,
                banner: metadata.banner,
                cover: metadata.cover,
                game_id: game_id.args[0].toNumber(),
              } as MetaGameFieldProps;
            }
          );
        }

        if (filter === 'game_id' && arg) {
          return Promise.all(
            arg.map(async game_id => {
              const service = await api.query.game.gameMetadataOf(game_id);

              if (service.isEmpty) return;

              const metadata = JSON.parse(
                String(service.value.data.toHuman())
              ) as TypeMetadataOfGame;

              return {
                title: metadata.title,
                categories: metadata.categories,
                description: metadata.description,
                website: metadata.website,
                twitter: metadata.twitter,
                discord: metadata.discord,
                avatar: metadata.avatar,
                banner: metadata.banner,
                cover: metadata.cover,
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

  return {
    MetaGame: data,
    isLoading,
  };
};
