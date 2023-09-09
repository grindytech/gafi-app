import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from './useRedux';
import { TypeMetadataOfItem } from 'types';
import { useEffect } from 'react';
import useSubscribeSystem from './useSubscribeSystem';
import { Option } from '@polkadot/types';
import { PalletNftsItemMetadata } from '@polkadot/types/lookup';

export interface useMetaNFTProps {
  filter: 'entries' | 'collection_id';
  arg?: { collection_id: number; nft_id: number }[];
  key: string | string[] | number | number[];
}

interface MetaNFTFieldProps extends TypeMetadataOfItem {
  collection_id: number;
  nft_id: number;
}

export default function useMetaNFT({ filter, arg, key }: useMetaNFTProps) {
  const { event, setEvent } = useSubscribeSystem('nfts::ItemMetadataSet');

  const { api } = useAppSelector(state => state.substrate);

  const { data, refetch } = useQuery({
    queryKey: ['itemMetadataOf', key],
    queryFn: async () => {
      if (api) {
        if (filter === 'entries') {
          const service = await api.query.nfts.itemMetadataOf.entries();

          return service.map(([key, option]) => {
            const meta = option as Option<PalletNftsItemMetadata>;

            const metadata = JSON.parse(
              String(meta.value.data.toHuman())
            ) as TypeMetadataOfItem;

            return {
              title: metadata.title,
              description: metadata.description,
              external_url: metadata.external_url,
              avatar: metadata.avatar,
              collection_id: key.args[0].toNumber(),
              nft_id: key.args[1].toNumber(),
            } as MetaNFTFieldProps;
          });
        }

        if (filter === 'collection_id' && arg) {
          return Promise.all(
            arg.map(async ({ collection_id, nft_id }) => {
              const service = (await api.query.nfts.itemMetadataOf(
                collection_id,
                nft_id
              )) as Option<PalletNftsItemMetadata>;

              // not found
              if (service.isEmpty) return;

              const metadata = JSON.parse(
                String(service.value.data.toHuman())
              ) as TypeMetadataOfItem;

              return {
                title: metadata.title,
                description: metadata.description,
                external_url: metadata.external_url,
                avatar: metadata.avatar,
                collection_id,
                nft_id,
              } as MetaNFTFieldProps;
            })
          ).then(data =>
            data.filter((meta): meta is MetaNFTFieldProps => !!meta)
          );
        }
      }

      // not found group
      return [];
    },
    enabled: !!api?.query.nfts.itemMetadataOf || !!arg,
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

        if (filter === 'collection_id' && arg) {
          arg.forEach(({ collection_id, nft_id }) => {
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
