import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from './useRedux';
import { TypeMetadataOfCollection } from 'types';
import useSubscribeSystem from './useSubscribeSystem';
import { useEffect } from 'react';

export interface useMetaCollectionProps {
  key?: string;
  group:
    | {
        collection_id: number;
      }[]
    | undefined;
}

export default function useMetaCollection({
  key,
  group,
}: useMetaCollectionProps) {
  const { event, setEvent } = useSubscribeSystem('nfts::CollectionMetadataSet');

  const { api } = useAppSelector(state => state.substrate);

  const { data, refetch } = useQuery({
    queryKey: [`metaCollection/${key}`],
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

  return {
    metaCollection: data,
  };
}
