import { Option } from '@polkadot/types';
import { PalletNftsItemDetails } from '@polkadot/types/lookup';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from './useRedux';

export interface nftsItemProps {
  collection_id: number;
  nft_id: number;
  owner: string;
}

export interface useGetNFTProps {
  key?: string;
  group: number[];
  filter?: 'only';
}

export default function useGetNFT<T>({
  key,
  group,
  filter,
}: useGetNFTProps): T {
  const { api } = useAppSelector(state => state.substrate);

  const { data } = useQuery({
    queryKey: [`nfts_item/${key}`],
    queryFn: async () => {
      if (api) {
        const response = await Promise.all(
          group.map(async collection_id => {
            return (await api.query.nfts.item.entries(collection_id)).map(
              ([id, meta]) => {
                const service = meta as Option<PalletNftsItemDetails>;
                const [collection, nft] = id.args;

                return {
                  collection_id: collection.toNumber(),
                  nft_id: nft.toNumber(),
                  owner: service.value.owner.toString(),
                };
              }
            );
          })
        ).then(item => item[0]);

        if (filter === 'only') {
          return response.find(
            ({ collection_id }) => collection_id === group[0]
          );
        }

        return response;
      }

      // not found group
      return [];
    },
    enabled: !!group,
  });

  return data as T;
}
