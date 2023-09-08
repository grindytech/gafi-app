import { Text } from '@chakra-ui/react';
import { Option } from '@polkadot/types';
import { PalletNftsItemDetails } from '@polkadot/types/lookup';
import { isNull } from '@polkadot/util';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from 'hooks/useRedux';
import { CreatorLoadingProps } from 'pages/Creator';
import { useEffect } from 'react';

export interface TabsNFTDataProps {
  collection_id: number;
  nft_id: number;
  owner: string;
  infinity: boolean;
}

interface TabsCollectionProps {
  setLoading: React.Dispatch<React.SetStateAction<CreatorLoadingProps>>;
}

export default ({ setLoading }: TabsCollectionProps) => {
  const { account } = useAppSelector(state => state.injected.polkadot);
  const { api } = useAppSelector(state => state.substrate);

  const { data, isLoading } = useQuery({
    queryKey: ['creator_tab_nft', account?.address],
    queryFn: async () => {
      if (api && account?.address) {
        const service = await api.query.nfts.item.entries();

        return Promise.all(
          service.map(async ([nft_id, key]) => {
            const option = key as Option<PalletNftsItemDetails>;

            const getInfinity = await api.query.game.supplyOf(
              nft_id.args[0].toNumber(),
              nft_id.args[1].toNumber()
            );

            const getRole = await api.query.nfts.collectionRoleOf.entries(
              nft_id.args[0].toNumber()
            );

            const getOwner = option.value.owner.toString() === account.address;

            if (
              getOwner ||
              getRole[0][0].args[1].toString() === account.address
            ) {
              return {
                collection_id: nft_id.args[0].toNumber(),
                nft_id: nft_id.args[1].toNumber(),
                owner: option.value.owner.toString(),
                infinity: isNull(getInfinity.toHuman()),
              } as TabsNFTDataProps;
            }
          })
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
      nft: {
        loading: isLoading,
        data,
      },
    }));
  }, [data]);

  return (
    <>
      <Text>NFT</Text>

      <Text as="span">{data?.length || 0}</Text>
    </>
  );
};
