import { Option, StorageKey, u32 } from '@polkadot/types';
import { PalletNftsCollectionDetails } from '@polkadot/types/lookup';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from './useRedux';

export interface nftsCollectionProps {
  collection_id: number;
  owner: string;
  items: number;
}

export interface useGetCollectionProps {
  key?: string;
  group?: number[] | string[];
  filter?: 'owner' | 'only';
}

function useGetCollection<T>({ key, group, filter }: useGetCollectionProps): {
  data: T;
  isLoading: boolean;
  isError: boolean;
} {
  const { api } = useAppSelector(state => state.substrate);

  const { data, isLoading, isError } = useQuery({
    queryKey: [`nfts_collection/${key}`],
    queryFn: async () => {
      if (api) {
        const service = (await api.query.nfts.collection.entries()).map(
          ([collection, meta]: [
            StorageKey<[u32]>,
            Option<PalletNftsCollectionDetails>
          ]) => ({
            collection_id: collection.args[0].toNumber(),
            owner: meta.value.owner.toString(),
            items: meta.value.items.toNumber(),
          })
        );

        if (filter === 'only') {
          return service.find(
            ({ collection_id }) => collection_id === group?.[0]
          );
        }

        if (filter === 'owner') {
          return service.filter(({ owner }) => owner === group?.[0]);
        }

        return service;
      }

      // not found group
      return [];
    },
    enabled: !!group,
  });

  return {
    data: data as T,
    isLoading,
    isError,
  };
}

export default useGetCollection;
