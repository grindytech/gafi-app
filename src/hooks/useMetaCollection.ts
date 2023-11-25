import { useQuery } from '@tanstack/react-query';

import useSubscribeSystem from './useSubscribeSystem';
import { useEffect } from 'react';
import { useSubstrateContext } from 'contexts/contexts.substrate';
import { TypeMetaCollection } from 'types/meta.type.ts';

export interface useMetaCollectionProps {
  filter: 'entries' | 'collection_id';
  arg?: number[];
  key: string | string[] | number | number[];
  async?: boolean;
}

export interface MetaCollectionFieldProps extends TypeMetaCollection {
  collection_id: number;
}

export default function useMetaCollection({
  filter,
  arg,
  key,
  async,
}: useMetaCollectionProps) {
  const { api } = useSubstrateContext();
  const { event, setEvent } = useSubscribeSystem('nfts::CollectionMetadataSet');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`collectionMetadataOf`, key],
    queryFn: async () => {
      if (api) {
        if (filter === 'entries') {
          const service = await api.query.nfts.collectionMetadataOf.entries();

          return service.map(([collection_id, meta]) => {
            const metadata = JSON.parse(
              String(meta.value.data.toHuman())
            ) as TypeMetaCollection;

            return {
              ...metadata,
              collection_id: collection_id.args[0].toNumber(),
            } as MetaCollectionFieldProps;
          });
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
              ) as TypeMetaCollection;

              return {
                ...metadata,
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
    if (async && !isLoading) {
      refetch();
    }
  }, [isLoading]);

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
