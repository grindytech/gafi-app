import { Option } from '@polkadot/types';
import { PalletNftsCollectionMetadata } from '@polkadot/types/lookup';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from './useRedux';
import { TypeMetadataOfCollection } from 'types';
import useSubscribeSystem from './useSubscribeSystem';
import { useEffect } from 'react';

interface useMetaCollectionProps {
  collection_id: number;
  key: string;
}

export default function useMetaCollection({
  collection_id,
  key,
}: useMetaCollectionProps) {
  const { event, setEvent } = useSubscribeSystem('nfts::CollectionMetadataSet');

  const { api } = useAppSelector(state => state.substrate);

  const { data, refetch } = useQuery({
    queryKey: [`metaCollection/${key}`],
    queryFn: async () => {
      if (api) {
        const service = (await api.query.nfts.collectionMetadataOf(
          collection_id
        )) as Option<PalletNftsCollectionMetadata>;

        if (service.isEmpty) {
          return null;
        }

        return JSON.parse(
          String(service.value.data.toHuman())
        ) as TypeMetadataOfCollection;
      }
    },
  });

  useEffect(() => {
    if (event) {
      event.forEach(({ eventValue }) => {
        const [collection] = JSON.parse(eventValue);

        if (collection === collection_id) {
          refetch();
          setEvent([]);

          console.log('refetch collection', collection);
        }
      });
    }
  }, [event]);

  return {
    metaCollection: data,
  };
}
