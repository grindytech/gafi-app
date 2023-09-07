import { Text } from '@chakra-ui/react';
import { Option, StorageKey, u32, u8 } from '@polkadot/types';
import { PalletNftsCollectionDetails } from '@polkadot/types/lookup';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from 'hooks/useRedux';
import { CreatorLoadingProps } from 'pages/Creator';
import { useEffect } from 'react';

export interface TabsCollectionDataProps {
  game: number[];
  collection_id: number;
  owner: string;
  role: string;
  items: number;
}

interface TabsCollectionProps {
  setLoading: React.Dispatch<React.SetStateAction<CreatorLoadingProps>>;
}

export default ({ setLoading }: TabsCollectionProps) => {
  const { account } = useAppSelector(state => state.injected.polkadot);
  const { api } = useAppSelector(state => state.substrate);

  const { data, isLoading } = useQuery({
    queryKey: ['creator_tab_collection', account?.address],
    queryFn: async () => {
      if (api && account?.address) {
        const service = await api.query.nfts.collection.entries();

        return Promise.all(
          service.map(
            async ([collection_id, option]: [
              StorageKey<[u32]>,
              Option<PalletNftsCollectionDetails>
            ]) => {
              const game = await api.query.game.gamesOf(
                collection_id.args[0].toNumber()
              );

              const getOwner =
                option.value.owner.toString() === account.address;

              const getRole = (await api.query.nfts.collectionRoleOf(
                collection_id.args[0].toNumber(),
                account.address
              )) as Option<u8>;

              if (getOwner || getRole.isSome) {
                return {
                  game: game.toJSON(),
                  collection_id: collection_id.args[0].toNumber(),
                  owner: option.value.owner.toString(),
                  role: account.address,
                  items: option.value.items.toNumber(),
                } as TabsCollectionDataProps;
              }
            }
          )
        ).then(data =>
          data.filter((meta): meta is NonNullable<typeof meta> => !!meta)
        );
      }

      // not found
      return [];
    },
    enabled: !!api?.query.nfts,
  });

  useEffect(() => {
    setLoading(prev => ({
      ...prev,
      collection: {
        loading: isLoading,
        data,
      },
    }));
  }, [data]);

  return (
    <>
      <Text>Collection</Text>

      <Text as="span">{data?.length || 0}</Text>
    </>
  );
};
