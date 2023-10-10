import { Text } from '@chakra-ui/react';
import { Option, StorageKey, u32 } from '@polkadot/types';
import { PalletGameGameDetails } from '@polkadot/types/lookup';
import { useQuery } from '@tanstack/react-query';
import { useAccountContext } from 'contexts/contexts.account';
import { useSubstrateContext } from 'contexts/contexts.substrate';

import { CreatorLoadingProps } from 'pages/Creator';

import { useEffect } from 'react';

export interface TabsGameDataProps {
  collection: number[];
  game_id: number;
  owner: string;
  role: string;
}

interface TabsGameProps {
  setLoading: React.Dispatch<React.SetStateAction<CreatorLoadingProps>>;
}

export default ({ setLoading }: TabsGameProps) => {
  const { account } = useAccountContext();
  const { api } = useSubstrateContext();

  const { data, isLoading } = useQuery({
    queryKey: ['creator_tab_game', account.current?.address],
    queryFn: async () => {
      if (api && account.current?.address) {
        const service = await api.query.game.game.entries();

        return Promise.all(
          service.map(
            async ([game_id, option]: [
              StorageKey<[u32]>,
              Option<PalletGameGameDetails>
            ]) => {
              const collection = await api.query.game.collectionsOf(
                game_id.args[0].toNumber()
              );

              const getOwner =
                option.value.owner.toString() === account.current?.address;

              const getRole =
                option.value.admin.toString() === account.current?.address;

              if (getOwner || getRole) {
                return {
                  collection: collection.toJSON(),
                  game_id: game_id.args[0].toNumber(),
                  owner: option.value.owner.toString(),
                  role: option.value.admin.toString(),
                };
              }
            }
          )
        ).then(data =>
          data.filter((meta): meta is TabsGameDataProps => !!meta)
        );
      }

      // not found
      return [];
    },
    enabled: !!(account.current?.address && api?.query.game),
  });

  useEffect(() => {
    setLoading(prev => ({
      ...prev,
      game: {
        loading: isLoading,
        data,
      },
    }));
  }, [data]);

  return (
    <>
      <Text>Game</Text>

      <Text as="span">{data?.length || 0}</Text>
    </>
  );
};
