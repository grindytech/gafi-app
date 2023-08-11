import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from './useRedux';
import { TypeMetadataOfItem } from 'types';
import { useEffect } from 'react';
import useSubscribeSystem from './useSubscribeSystem';
import { Option, StorageKey, u32 } from '@polkadot/types';
import { PalletNftsItemMetadata } from '@polkadot/types/lookup';

export interface useMetaNFTProps {
  filter: 'entries' | { collection_id: number; nft_id: number }[];
  key: string | string[] | number | number[];
}

export default function useMetaNFT({ filter, key }: useMetaNFTProps) {
  const { event, setEvent } = useSubscribeSystem('nfts::ItemMetadataSet');

  const { api } = useAppSelector(state => state.substrate);

  const { data, refetch } = useQuery({
    queryKey: ['itemMetadataOf', key],
    queryFn: async () => {
      if (api) {
        if (filter === 'entries') {
          const service = await api.query.nfts.itemMetadataOf.entries();

          return service.map(
            ([option, meta]: [
              StorageKey<[u32, u32]>,
              any // Option<PalletNftsItemMetadata>
            ]) => {
              const { title, image } = JSON.parse(meta.value.data.toHuman());

              const response: TypeMetadataOfItem = {
                collection_id: option.args[0].toNumber(),
                nft_id: option.args[1].toNumber(),
                image,
                title,
              };

              return response;
            }
          );
        }

        if (filter) {
          return Promise.all(
            filter.map(async ({ collection_id, nft_id }) => {
              const service = (await api.query.nfts.itemMetadataOf(
                collection_id,
                nft_id
              )) as Option<PalletNftsItemMetadata>;

              if (service.isEmpty) return;

              const { title, image } = JSON.parse(
                service.value.data.toHuman() as string
              );

              const response: TypeMetadataOfItem = {
                collection_id,
                nft_id,
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
        const [collection, item] = JSON.parse(eventValue);

        if (filter === 'entries') {
          refetch();
          setEvent([]);

          return;
        }

        if (filter) {
          filter.forEach(({ collection_id, nft_id }) => {
            if (collection === collection_id && item === nft_id) {
              refetch();
            }

            setEvent([]);
          });
        }
      });
    }
  }, [event]);

  return {
    metaNFT: data,
  };
}
