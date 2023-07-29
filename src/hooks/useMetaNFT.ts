import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from './useRedux';
import { Option } from '@polkadot/types';
import { PalletNftsItemMetadata } from '@polkadot/types/lookup';
import { TypeMetadataOfItem } from 'types';
import { useEffect } from 'react';
import useSubscribeSystem from './useSubscribeSystem';

interface useMetaNFTProps {
  collection_id: number;
  nft_id: number;
  key: string;
}

export default function useMetaNFT({
  collection_id,
  nft_id,
  key,
}: useMetaNFTProps) {
  const { event, setEvent } = useSubscribeSystem('nfts::ItemMetadataSet');

  const { api } = useAppSelector(state => state.substrate);

  const { data, refetch } = useQuery({
    queryKey: [`metaItem/${key}`],
    queryFn: async () => {
      if (api) {
        const service = (await api.query.nfts.itemMetadataOf(
          collection_id,
          nft_id
        )) as Option<PalletNftsItemMetadata>;

        if (service.isEmpty) {
          return null;
        }

        return JSON.parse(
          String(service.value.data.toHuman())
        ) as TypeMetadataOfItem;
      }
    },
  });

  useEffect(() => {
    if (event) {
      event.forEach(({ eventValue }) => {
        const [collection, item] = JSON.parse(eventValue);

        if (collection === collection_id && item === nft_id) {
          refetch();
          setEvent([]);
        }
      });
    }
  }, [event]);

  return {
    metaNFT: data,
  };
}
