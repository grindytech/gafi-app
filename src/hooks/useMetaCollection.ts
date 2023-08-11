import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from './useRedux';
import { TypeMetadataOfCollection } from 'types';
import useSubscribeSystem from './useSubscribeSystem';
import { useEffect } from 'react';
import { Option, StorageKey, u32 } from '@polkadot/types';
import { PalletNftsCollectionMetadata } from '@polkadot/types/lookup';

export interface useMetaCollectionProps {
  filter: 'entries' | number[];
  key: string | string[] | number | number[];
}

export default function useMetaCollection({
  filter,
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
              const { external_url, image, title } = JSON.parse(
                meta.value.data.toHuman() as string
              );

              const response: TypeMetadataOfCollection = {
                collection_id: collection_id.args[0].toNumber(),
                external_url,
                image,
                title,
              };

              return response;
            }
          );
        }

        if (filter) {
          return Promise.all(
            filter.map(async collection_id => {
              const service = await api.query.nfts.collectionMetadataOf(
                collection_id
              );

              if (service.isEmpty) return;

              const { external_url, image, title } = JSON.parse(
                service.value.data.toHuman() as string
              );

              const response: TypeMetadataOfCollection = {
                collection_id: collection_id,
                external_url,
                image,
                title,
              };

              return response;
            })
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

        if (filter) {
          filter.forEach(collection_id => {
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
