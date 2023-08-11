import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from './useRedux';

export interface NFTsCollectionProps {
  entries: {
    collection_id: number;
  }[];
  number: {
    owner: string;
    items: number;
    itemMetadatas: number;
    itemConfigs: number;
    attributes: number;
  };
}

interface useNFTsCollectionProps {
  filter: 'entries' | number;
  key: string | string[] | number | number[];
}

export default function useNFTsCollection<Type>({
  filter,
  key,
}: useNFTsCollectionProps) {
  const { api } = useAppSelector(state => state.substrate);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['nfts_collection', key],
    queryFn: async () => {
      if (api) {
        if (filter === 'entries') {
          const service = await api.query.nfts.collection.entries();

          return service.map(
            ([
              {
                args: [collection_id],
              },
            ]) => ({ collection_id: collection_id.toNumber() })
          );
        }

        if (filter) {
          const service = await api.query.nfts.collection(filter);

          const response: NFTsCollectionProps['number'] = {
            owner: service.value.owner.toString(),
            items: service.value.items.toNumber(),
            itemMetadatas: service.value.itemMetadatas.toNumber(),
            itemConfigs: service.value.itemConfigs.toNumber(),
            attributes: service.value.attributes.toNumber(),
          };

          return response;
        }
      }
    },
  });

  return {
    NFTsCollection: data as Type,
    isError,
    isLoading,
  };
}
