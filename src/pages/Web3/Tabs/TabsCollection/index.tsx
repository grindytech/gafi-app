import { Text } from '@chakra-ui/react';
import { Option, StorageKey, u32 } from '@polkadot/types';
import { PalletNftsCollectionDetails } from '@polkadot/types/lookup';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from 'hooks/useRedux';
import { Web3MetaProps } from 'pages/Web3';
import { useEffect } from 'react';

export interface TabsCollectionDataProps {
  game: number[];
  collection_id: number;
  owner: string;
  role: string;
  items: number;
}

interface TabsCollectionProps {
  setMeta: React.Dispatch<React.SetStateAction<Web3MetaProps>>;
}

export default ({ setMeta }: TabsCollectionProps) => {
  const { account } = useAppSelector(state => state.injected.polkadot);
  const { api } = useAppSelector(state => state.substrate);

  const { data } = useQuery({
    queryKey: ['web3_tab_collection', account?.address],
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

              const getRole = await api.query.nfts.collectionRoleOf.entries(
                collection_id.args[0].toNumber()
              );

              if (
                getOwner ||
                getRole[0][0].args[1].toString() === account.address
              ) {
                return {
                  game: game.toJSON(),
                  collection_id: collection_id.args[0].toNumber(),
                  owner: option.value.owner.toString(),
                  role: getRole[0][0].args[1].toString(),
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
    setMeta(prev => ({
      ...prev,
      collection: data,
    }));
  }, [data]);

  return (
    <>
      <Text>Collection</Text>

      <Text as="span">{data?.length}</Text>
    </>
  );
};
