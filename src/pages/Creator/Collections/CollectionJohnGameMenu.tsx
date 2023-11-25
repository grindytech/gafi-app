import { useQuery } from '@tanstack/react-query';

import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { CollectionsFieldProps } from '.';
import JohnPopover from 'layouts/JohnPopover';
import JohnPopoverJSX from 'layouts/JohnPopover/JohnPopoverJSX';
import JohnPopoverEmpty from 'layouts/JohnPopover/JohnPopoverEmpty';
import { useDisclosure } from '@chakra-ui/react';

import swaggerAxios from 'axios/swagger.axios';
import { useAccountContext } from 'contexts/contexts.account';
import { TypeSwaggerSearchGameData } from 'types/swagger.type';

interface CollectionsJohnGameMenuProps {
  setValue: UseFormSetValue<CollectionsFieldProps>;
  watch: UseFormWatch<CollectionsFieldProps>;
  address: string;
}

export default ({ setValue, address, watch }: CollectionsJohnGameMenuProps) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const { john_game } = watch();
  const { account } = useAccountContext();

  const { data } = useQuery({
    queryKey: ['creator_collection_menu', address],
    queryFn: async () => {
      if (account.current?.address) {
        return swaggerAxios.gameSearch({
          body: {
            query: {
              owner: account.current.address,
            },
          },
        });
      }

      return [] as Partial<TypeSwaggerSearchGameData>;
    },
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
          {unique_john_game.map(
            ({
              game_id,
              logo,
              name,
              banner,
              category,
              cover,
              description,
              discord,
              website,
              twitter,
            }) => {
              return (
                <JohnPopoverJSX
                  key={game_id}
                  id={game_id}
                  image={logo}
                  name={name}
                  onClick={() => {
                    onClose();
                    setValue(`john_game`, {
                      id: game_id,
                      meta: {
                        category,
                        description,
                        discord,
                        logo,
                        name,
                        twitter,
                        website,
                        banner,
                        cover,
                      },
                    });
                  }}
                />
              );
            }
          )}
        </JohnPopover>
      ) : (
        <JohnPopoverEmpty />
      )}
    </>
  );
};
