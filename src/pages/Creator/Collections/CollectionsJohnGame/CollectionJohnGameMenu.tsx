import { Option, StorageKey, u32 } from '@polkadot/types';
import { PalletGameGameDetails } from '@polkadot/types/lookup';
import { useQuery } from '@tanstack/react-query';

import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { CollectionsFieldProps } from '..';
import JohnPopover from 'layouts/John/JohnPopover';
import JohnPopoverJSX from 'layouts/John/JohnPopover/JohnPopoverJSX';
import JohnPopoverEmpty from 'layouts/John/JohnPopover/JohnPopoverEmpty';
import { useDisclosure } from '@chakra-ui/react';
import useMetaGame from 'hooks/useMetaGame';
import { useSubstrateContext } from 'contexts/contexts.substrate';

interface CollectionJohnGamesMenuServiceProps
  extends Omit<CollectionsJohnGameMenuProps, 'address'> {
  data: { game_id: number }[];
}
interface CollectionsJohnGameMenuProps {
  setValue: UseFormSetValue<CollectionsFieldProps>;
  watch: UseFormWatch<CollectionsFieldProps>;
  address: string;
}

export default ({ setValue, address, watch }: CollectionsJohnGameMenuProps) => {
  const { api } = useSubstrateContext();

  const { data } = useQuery({
    queryKey: ['creator_collection_menu', address],
    queryFn: async () => {
      if (api && address) {
        const service = await api.query.game.game.entries();

        return Promise.all(
          service.map(
            async ([game_id, option]: [
              StorageKey<[u32]>,
              Option<PalletGameGameDetails>
            ]) => {
              const getOwner = option.value.owner.toString() === address;
              const getRole = option.value.admin.toString() === address;

              if (getOwner || getRole) {
                return {
                  game_id: game_id.args[0].toNumber(),
                };
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

  return (
    <>
      {data?.length ? (
        <CollectionJohnGamesMenuService
          watch={watch}
          data={data}
          setValue={setValue}
        />
      ) : (
        <JohnPopoverEmpty />
      )}
    </>
  );
};

function CollectionJohnGamesMenuService({
  data,
  setValue,
  watch,
}: CollectionJohnGamesMenuServiceProps) {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const { general_join_game } = watch();

  const unique_john_game = data.filter(
    ({ game_id }) => general_join_game?.game_id !== game_id
  );

  const { MetaGame } = useMetaGame({
    key: `creator_create_collection`,
    filter: 'game_id',
    arg: data.map(({ game_id }) => game_id),
  });

  return (
    <JohnPopover
      isOpen={isOpen}
      onToggle={onToggle}
      onClose={onClose}
      sx={{
        sx: {
          '.chakra-popover__content': {
            height: unique_john_game.length >= 3 ? '10rem' : 'fit-content',
          },
        },
      }}
    >
      {unique_john_game.map(({ game_id }) => {
        const currentMetaGame = MetaGame?.find(
          meta => meta.game_id === game_id
        );

        return (
          <JohnPopoverJSX
            key={game_id}
            id={game_id}
            image={currentMetaGame?.avatar}
            name={currentMetaGame?.title || 'unknown'}
            onClick={() => {
              onClose();
              setValue(`general_join_game`, {
                game_id,
                option: currentMetaGame,
              });
            }}
          />
        );
      })}
    </JohnPopover>
  );
}
