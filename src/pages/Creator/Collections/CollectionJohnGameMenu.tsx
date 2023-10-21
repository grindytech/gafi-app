import { useQuery } from '@tanstack/react-query';

import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { CollectionsFieldProps } from '.';
import JohnPopover from 'layouts/JohnPopover';
import JohnPopoverJSX from 'layouts/JohnPopover/JohnPopoverJSX';
import JohnPopoverEmpty from 'layouts/JohnPopover/JohnPopoverEmpty';
import { useDisclosure } from '@chakra-ui/react';
import useMetaGame from 'hooks/useMetaGame';
import swaggerAxios from 'axios/swagger.axios';

interface CollectionsJohnGameMenuProps {
  setValue: UseFormSetValue<CollectionsFieldProps>;
  watch: UseFormWatch<CollectionsFieldProps>;
  address: string;
}

export default ({ setValue, address, watch }: CollectionsJohnGameMenuProps) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const { john_game } = watch();

  const { data, isLoading } = useQuery({
    queryKey: ['creator_collection_menu', address],
    queryFn: async () => {
      return swaggerAxios.gameSearch({});
    },
  });

  const { MetaGame } = useMetaGame({
    key: `creator_create_collection`,
    filter: 'game_id',
    arg: data?.data.map(meta => Number(meta.game_id)),
    async: isLoading,
  });

  const unique_john_game = data?.data?.filter(
    ({ game_id }) => john_game?.id !== game_id
  );

  return (
    <>
      {unique_john_game?.length ? (
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
                image={currentMetaGame?.logo}
                name={currentMetaGame?.name}
                onClick={() => {
                  onClose();
                  setValue(`john_game`, {
                    id: game_id,
                    meta: currentMetaGame,
                  });
                }}
              />
            );
          })}
        </JohnPopover>
      ) : (
        <JohnPopoverEmpty />
      )}
    </>
  );
};
