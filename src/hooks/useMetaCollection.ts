import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from './useRedux';
import { TypeMetadataOfCollection } from 'types';
import useSubscribeSystem from './useSubscribeSystem';
import { useEffect } from 'react';
import { Option, StorageKey, u32 } from '@polkadot/types';
import { PalletNftsCollectionMetadata } from '@polkadot/types/lookup';

export interface useMetaCollectionProps {
  filter: 'entries' | 'collection_id';
  arg?: number[];
  key: string | string[] | number | number[];
}

export interface MetaCollectionFieldProps extends TypeMetadataOfCollection {
  collection_id: number;
}

export default function useMetaCollection({
  filter,
  arg,
  key,
}: useMetaCollectionProps) {
  const { event, setEvent } = useSubscribeSystem('nfts::CollectionMetadataSet');

  const { api } = useAppSelector(state => state.substrate);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`collectionMetadataOf`, key],
    queryFn: async () => {
      if (api) {
        if (filter === 'entries') {
          const service = await api.query.nfts.collectionMetadataOf.entries();

          return service.map(
            ([collection_id, meta]: [
              StorageKey<[u32]>,
              Option<PalletNftsCollectionMetadata>
            ]) => {
              const metadata = JSON.parse(
                String(meta.value.data.toHuman())
              ) as TypeMetadataOfCollection;

              return {
                title: metadata.title || 'unknown',
                description: metadata.description || 'unknown',
                external_url: metadata.external_url || 'unknown',
                avatar: metadata.avatar,
                banner: metadata.banner,
                cover: metadata.cover,
                collection_id: collection_id.args[0].toNumber(),
              } as MetaCollectionFieldProps;
            }
          );
        }

        if (filter === 'collection_id' && arg) {
          return Promise.all(
            arg.map(async collection_id => {
              const service = await api.query.nfts.collectionMetadataOf(
                collection_id
              );

              if (service.isEmpty) return;

              const metadata = JSON.parse(
                String(service.value.data.toHuman())
              ) as TypeMetadataOfCollection;

              return {
                title: metadata.title,
                description: metadata.description,
                external_url: metadata.external_url,
                avatar: metadata.avatar,
                banner: metadata.banner,
                cover: metadata.cover,
                collection_id,
              } as MetaCollectionFieldProps;
            })
          ).then(data =>
            data.filter((meta): meta is MetaCollectionFieldProps => !!meta)
          );
        }
      }

      // not found group
      return [];
    },
    enabled: !!filter,
  });

  useEffect(() => {
    if (event) {
      event.forEach(({ eventValue }) => {
        const [collection] = JSON.parse(eventValue);

        if (filter === 'entries') {
          refetch();
          setEvent([]);

          return;
        }

        if (filter === 'collection_id' && arg) {
          arg.forEach(collection_id => {
            if (collection === collection_id) {
              refetch();
            }

            setEvent([]);
          });

          return;
        }
      });
    }
  }, [event]);

  return {
    MetaCollection: data,
    isLoading,
    isError,
  };
}
