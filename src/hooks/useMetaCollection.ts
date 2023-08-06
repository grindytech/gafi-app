import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from './useRedux';
import { TypeMetadataOfCollection } from 'types';
import useSubscribeSystem from './useSubscribeSystem';
import { useEffect } from 'react';

interface groupMetaNFTProps {
  collection_id: number;
}

export interface useMetaCollectionProps {
  key?: string;
  group: groupMetaNFTProps[] | undefined;
}

export default function useMetaCollection({
  key,
  group,
}: useMetaCollectionProps) {
  const { event, setEvent } = useSubscribeSystem('nfts::CollectionMetadataSet');

  const { api } = useAppSelector(state => state.substrate);

  const { data, refetch } = useQuery({
    queryKey: [`nfts_collectionMetadataOf/${key}`],
    queryFn: async () => {
      if (api && group?.length) {
        const response = Promise.all(
          group.map(async ({ collection_id }) => {
            const service = await api.query.nfts.collectionMetadataOf(
              collection_id
            );

            if (service.isEmpty) return null;

            return {
              ...JSON.parse(service.value.data.toHuman()),
              collection_id,
            };
          })
        );

        return (await response).filter(
          (item): item is TypeMetadataOfCollection => !!item
        );
      }

      // not found group
      return [];
    },
    enabled: !!group,
  });

  useEffect(() => {
    if (event && group?.length) {
      event.forEach(({ eventValue }) => {
        const [collection] = JSON.parse(eventValue);

        group.forEach(({ collection_id }) => {
          if (collection === collection_id) {
            setEvent([]);
            refetch();
          }
        });
      });
    }
  }, [event]);

  const currentMetaCollection = ({ collection_id }: groupMetaNFTProps) => {
    return data?.find(meta => meta?.collection_id === collection_id);
  };

  return {
    metaCollection: data,
    currentMetaCollection,
  };
}
