import { useQuery } from '@tanstack/react-query';

import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { NFTsFieldProps } from '.';

import JohnPopover from 'layouts/JohnPopover';
import JohnPopoverEmpty from 'layouts/JohnPopover/JohnPopoverEmpty';
import JohnPopoverJSX from 'layouts/JohnPopover/JohnPopoverJSX';
import { useDisclosure } from '@chakra-ui/react';

import swaggerAxios from 'axios/swagger.axios';
import { useAccountContext } from 'contexts/contexts.account';
import { TypeSwaggerSearchCollectionData } from 'types/swagger.type';

interface NFTsJohnCollectionProps {
  setValue: UseFormSetValue<NFTsFieldProps>;
  watch: UseFormWatch<NFTsFieldProps>;
  address: string;
}

export default ({ setValue, watch, address }: NFTsJohnCollectionProps) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const { john_collection } = watch();
  const { account } = useAccountContext();

  const { data } = useQuery({
    queryKey: ['creator_create_nft_menu', address],
    queryFn: async () => {
      if (account.current?.address) {
        return swaggerAxios.collectionSearch({
          body: {
            query: {
              owner: account.current.address,
            },
          },
        });
      }

      return [] as Partial<TypeSwaggerSearchCollectionData>;
    },
  });

  const unique_john_collection = data?.data?.filter(
    ({ collection_id }) => john_collection?.id !== collection_id
  );

  return (
    <>
      {unique_john_collection?.length ? (
        <JohnPopover
          isOpen={isOpen}
          onToggle={onToggle}
          onClose={onClose}
          sx={{
            sx: {
              '.chakra-popover__content': {
                height:
                  unique_john_collection.length >= 3 ? '10rem' : 'fit-content',
              },
            },
          }}
        >
          {unique_john_collection.map(
            ({
              banner,
              collection_id,
              cover,
              external_url,
              games,
              logo,
              name,
              description,
            }) => {
              return (
                <JohnPopoverJSX
                  key={collection_id}
                  id={collection_id}
                  name={name}
                  image={logo}
                  onClick={() => {
                    onClose();
                    setValue(`john_collection`, {
                      id: collection_id,
                      meta: {
                        description,
                        external_url,
                        game: games,
                        logo,
                        name,
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
