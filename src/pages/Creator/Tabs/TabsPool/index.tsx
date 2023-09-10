import { Text } from '@chakra-ui/react';
import { Option, StorageKey, Vec, u32 } from '@polkadot/types';
import {
  GafiSupportGameTypesLoot,
  PalletGamePoolDetails,
} from '@polkadot/types/lookup';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from 'hooks/useRedux';
import { CreatorLoadingProps } from 'pages/Creator';
import { useEffect } from 'react';

export interface TabsPoolDataProps {
  pool_id: number;
  poolType: string;
  owner: string;
  admin: string;
  price: string;
  endBlock: Option<u32>;
  lootOfTable: Vec<GafiSupportGameTypesLoot>;
  supplyOf: (string | null | undefined)[];
}

interface TabsCollectionProps {
  setLoading: React.Dispatch<React.SetStateAction<CreatorLoadingProps>>;
}

export default ({ setLoading }: TabsCollectionProps) => {
  const { account } = useAppSelector(state => state.injected.polkadot);
  const { api } = useAppSelector(state => state.substrate);

  const { data, isLoading } = useQuery({
    queryKey: ['creator_tab_pool', account?.address],
    queryFn: async () => {
      if (api && account?.address) {
        const service = await api.query.game.poolOf.entries();

        return Promise.all(
          service.map(
            async ([pool_id, meta]: [
              StorageKey<[u32]>,
              Option<PalletGamePoolDetails>
            ]) => {
              const owner = meta.value.owner.toString();
              const admin = meta.value.admin.toString();

              const lootOfTable = (await api.query.game.lootTableOf(
                pool_id.args[0].toNumber()
              )) as Vec<GafiSupportGameTypesLoot>;

              const supplyOf = await Promise.all(
                lootOfTable.map(async ({ maybeNft }) => {
                  if (maybeNft.isSome) {
                    const supplyOf = await api.query.game.supplyOf(
                      maybeNft.value.collection.toNumber(),
                      maybeNft.value.item.toNumber()
                    );

                    return supplyOf.toHuman() as string | null;
                  }
                })
              );

              if (account?.address === owner || account?.address === admin) {
                return {
                  pool_id: pool_id.args[0].toNumber(),
                  poolType: meta.value.poolType.toString(),
                  owner,
                  admin,
                  price: meta.value.mintSettings.price.toString(),
                  endBlock: meta.value.mintSettings.endBlock,
                  lootOfTable,
                  supplyOf,
                };
              }
            }
          )
        ).then(data =>
          data.filter((meta): meta is TabsPoolDataProps => !!meta)
        );
      }

      // not found
      return [];
    },
    enabled: !!api?.query.game,
  });

  useEffect(() => {
    setLoading(prev => ({
      ...prev,
      pool: {
        loading: isLoading,
        data: data,
      },
    }));
  }, [data]);

  return (
    <>
      <Text>Pool</Text>

      <Text as="span">{data?.length || 0}</Text>
    </>
  );
};
