import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import useSubscribeSystem from './useSubscribeSystem';
import { Option } from '@polkadot/types';
import { PalletNftsItemMetadata } from '@polkadot/types/lookup';
import { useSubstrateContext } from 'contexts/contexts.substrate';
import { TypeMetaNFT } from 'types/meta.type.ts';

export interface useMetaNFTProps {
  filter: 'entries' | 'collection_id';
  arg?: { collection_id: number; nft_id: number }[];
  key: string | string[] | number | number[];
  async?: boolean;
}

export interface MetaNFTFieldProps extends TypeMetaNFT {
  collection_id: number;
  nft_id: number;
}

export default function useMetaNFT({
  filter,
  arg,
  key,
  async,
}: useMetaNFTProps) {
  const { event, setEvent } = useSubscribeSystem('nfts::ItemMetadataSet');
  const { api } = useSubstrateContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['itemMetadataOf', key],
    queryFn: async () => {
      if (api) {
        if (filter === 'entries') {
          const service = await api.query.nfts.itemMetadataOf.entries();

          return service.map(([key, option]) => {
            const meta = option as Option<PalletNftsItemMetadata>;

            const metadata = JSON.parse(
              String(meta.value.data.toHuman())
            ) as TypeMetaNFT;

            return {
              ...metadata,
              collection_id: key.args[0].toNumber(),
              nft_id: key.args[1].toNumber(),
            } as MetaNFTFieldProps;
          });
        }

        if (filter === 'collection_id' && arg) {
          return Promise.all(
            arg.map(async ({ collection_id, nft_id }) => {
              const service = await api.query.nfts.itemMetadataOf(
                collection_id,
                nft_id
              );

              // not found
              if (service.isEmpty) return;

              const metadata = JSON.parse(
                String(service.value.data.toHuman())
              ) as TypeMetaNFT;

              return {
                ...metadata,
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

  useEffect(() => {
    if (!async && !isLoading) {
      refetch();
    }
  }, [async, isLoading]);

  return {
    metaNFT: data,
    isLoading,
  };
}
