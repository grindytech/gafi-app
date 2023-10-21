import { useQuery } from '@tanstack/react-query';

import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { NFTsFieldProps } from '.';

import JohnPopover from 'layouts/JohnPopover';
import JohnPopoverEmpty from 'layouts/JohnPopover/JohnPopoverEmpty';
import JohnPopoverJSX from 'layouts/JohnPopover/JohnPopoverJSX';
import { useDisclosure } from '@chakra-ui/react';
import useMetaCollection from 'hooks/useMetaCollection';

import swaggerAxios from 'axios/swagger.axios';

interface NFTsJohnCollectionProps {
  setValue: UseFormSetValue<NFTsFieldProps>;
  watch: UseFormWatch<NFTsFieldProps>;
  address: string;
}

export default ({ setValue, watch, address }: NFTsJohnCollectionProps) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const { john_collection } = watch();

  const { data, isLoading } = useQuery({
    queryKey: ['creator_create_nft_menu', address],
    queryFn: async () => {
      return swaggerAxios.collectionSearch();
    },
  });

  const unique_john_collection = data?.data?.filter(
    ({ collection_id }) => john_collection?.id !== collection_id
  );

  const { MetaCollection } = useMetaCollection({
    key: `creator_create_nft`,
    filter: 'collection_id',
    arg: data?.data?.map(({ collection_id }) => collection_id),
    async: isLoading,
  });

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
          {unique_john_collection.map(({ collection_id }) => {
            const currentMetaCollection = MetaCollection?.find(
              meta => meta.collection_id === collection_id
            );

            return (
              <JohnPopoverJSX
                key={collection_id}
                id={collection_id}
                name={currentMetaCollection?.name}
                image={currentMetaCollection?.logo}
                onClick={() => {
                  onClose();
                  setValue(`john_collection`, {
                    id: collection_id,
                    meta: currentMetaCollection,
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
