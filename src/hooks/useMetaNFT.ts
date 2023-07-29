import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from './useRedux';
import { TypeMetadataOfItem } from 'types';
import { useEffect } from 'react';
import useSubscribeSystem from './useSubscribeSystem';

interface useMetaNFTProps {
  key?: string;
  group:
    | {
        collection_id: number;
        nft_id: number;
      }[]
    | undefined;
}

export default function useMetaNFT({ key, group }: useMetaNFTProps) {
  const { event, setEvent } = useSubscribeSystem('nfts::ItemMetadataSet');

  const { api } = useAppSelector(state => state.substrate);

  const { data, refetch } = useQuery({
    queryKey: [`metaItem/${key}`],
    queryFn: async () => {
      if (api && group?.length) {
        const response = Promise.all(
          group.map(async ({ collection_id, nft_id }) => {
            const service = await api.query.nfts.itemMetadataOf(
              collection_id,
              nft_id
            );

            if (service.isEmpty) return null;

            return JSON.parse(service.value.data.toHuman());
          })
        );

        return (await response).filter(
          (item): item is TypeMetadataOfItem => !!item
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
        const [collection, item] = JSON.parse(eventValue);

        group.forEach(({ collection_id, nft_id }) => {
          if (collection === collection_id && nft_id === item) {
            refetch();
            setEvent([]);
          }
        });
      });
    }
  }, [event]);

  return {
    metaNFT: data,
  };
}
