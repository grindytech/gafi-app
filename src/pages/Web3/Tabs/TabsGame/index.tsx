import { Text } from '@chakra-ui/react';
import { Option, StorageKey, u32 } from '@polkadot/types';
import { PalletGameGameDetails } from '@polkadot/types/lookup';
import { useQuery } from '@tanstack/react-query';

import { useAppSelector } from 'hooks/useRedux';
import { Web3MetaProps } from 'pages/Web3';
import { useEffect } from 'react';

export interface TabsGameDataProps {
  collection: number[];
  game_id: number;
  owner: string;
  role: string;
}

interface TabsGameProps {
  setMeta: React.Dispatch<React.SetStateAction<Web3MetaProps>>;
}

export default ({ setMeta }: TabsGameProps) => {
  const { account } = useAppSelector(state => state.injected.polkadot);
  const { api } = useAppSelector(state => state.substrate);

  const { data } = useQuery({
    queryKey: ['web3_tab_game', account?.address],
    queryFn: async () => {
      if (api && account?.address) {
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
                option.value.owner.toString() === account.address;

              const getRole = option.value.admin.toString() === account.address;

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
    enabled: !!api?.query.game,
  });

  useEffect(() => {
    setMeta(prev => ({
      ...prev,
      game: data,
    }));
  }, [data]);

  return (
    <>
      {data?.length ? (
        <>
          <Text>Game</Text>

          <Text as="span">{data.length}</Text>
        </>
      ) : null}
    </>
  );
};
