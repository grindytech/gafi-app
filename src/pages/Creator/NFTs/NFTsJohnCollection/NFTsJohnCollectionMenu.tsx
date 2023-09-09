import { Option, StorageKey, u32 } from '@polkadot/types';
import { PalletNftsCollectionDetails } from '@polkadot/types/lookup';
import { useQuery } from '@tanstack/react-query';

import { useAppSelector } from 'hooks/useRedux';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { NFTsFieldProps } from '..';

import JohnPopover from 'layouts/John/JohnPopover';
import JohnPopoverEmpty from 'layouts/John/JohnPopover/JohnPopoverEmpty';
import JohnPopoverJSX from 'layouts/John/JohnPopover/JohnPopoverJSX';
import { useDisclosure } from '@chakra-ui/react';
import useMetaCollection from 'hooks/useMetaCollection';

interface NFTsJohnCollectionServiceProps
  extends Omit<NFTsJohnCollectionProps, 'address'> {
  data: { collection_id: number }[];
}

interface NFTsJohnCollectionProps {
  setValue: UseFormSetValue<NFTsFieldProps>;
  watch: UseFormWatch<NFTsFieldProps>;
  address: string;
}

export default ({ setValue, watch, address }: NFTsJohnCollectionProps) => {
  const { api } = useAppSelector(state => state.substrate);

  const { data } = useQuery({
    queryKey: ['creator_create_nft_menu', address],
    queryFn: async () => {
      if (api && address) {
        const service = await api.query.nfts.collection.entries();

        return Promise.all(
          service.map(
            async ([collection_id, option]: [
              StorageKey<[u32]>,
              Option<PalletNftsCollectionDetails>
            ]) => {
              const getOwner = option.value.owner.toString() === address;
              const getRole = await api.query.nfts.collectionRoleOf(
                collection_id.args[0].toNumber(),
                address
              );

              if (getOwner || getRole.isSome) {
                return {
                  collection_id: collection_id.args[0].toNumber(),
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
        <NFTsJohnCollectionService
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

function NFTsJohnCollectionService({
  data,
  setValue,
  watch,
}: NFTsJohnCollectionServiceProps) {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const { general_join_collection } = watch();

  const unique_john_collection = data.filter(
    ({ collection_id }) =>
      general_join_collection?.collection_id !== collection_id
  );

  const { MetaCollection } = useMetaCollection({
    key: `creator_create_nft`,
    filter: 'collection_id',
    arg: data.map(({ collection_id }) => collection_id),
  });

  return (
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
            name={currentMetaCollection?.title}
            image={currentMetaCollection?.avatar}
            onClick={() => {
              onClose();
              setValue(`general_join_collection`, {
                collection_id,
                option: currentMetaCollection,
              });
            }}
          />
        );
      })}
    </JohnPopover>
  );
}
