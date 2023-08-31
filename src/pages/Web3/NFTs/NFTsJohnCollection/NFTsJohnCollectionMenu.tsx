import { Option, StorageKey, u32 } from '@polkadot/types';
import { PalletNftsCollectionDetails } from '@polkadot/types/lookup';
import { useQuery } from '@tanstack/react-query';

import { useAppSelector } from 'hooks/useRedux';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { NFTsFieldProps } from '..';
import { PalletNftsCollectionMetadata } from '@polkadot/types/lookup';

import JohnPopover from 'layouts/John/JohnPopover';
import JohnPopoverEmpty from 'layouts/John/JohnPopover/JohnPopoverEmpty';
import JohnPopoverJSX from 'layouts/John/JohnPopover/JohnPopoverJSX';

interface CollectionsJohnGameMenuProps {
  setValue: UseFormSetValue<NFTsFieldProps>;
  watch: UseFormWatch<NFTsFieldProps>;
  address: string;
}

export default ({ setValue, watch, address }: CollectionsJohnGameMenuProps) => {
  const { api } = useAppSelector(state => state.substrate);
  const { general_join_collection } = watch();

  const { data } = useQuery({
    queryKey: ['web3_nft_menu', address],
    queryFn: async () => {
      if (api && address) {
        const service = await api.query.nfts.collection.entries();

        return Promise.all(
          service.map(
            async ([collection_id, option]: [
              StorageKey<[u32]>,
              Option<PalletNftsCollectionDetails>
            ]) => {
              const meta: Option<PalletNftsCollectionMetadata> =
                await api.query.nfts.collectionMetadataOf(
                  collection_id.args[0].toNumber()
                );

              const getOwner = option.value.owner.toString() === address;
              const getRole = await api.query.nfts.collectionRoleOf.entries(
                collection_id.args[0].toNumber()
              );

              if (getOwner || getRole[0][0].args[1].toString() === address) {
                return {
                  collection_id: collection_id.args[0].toNumber(),
                  option: meta.isSome
                    ? JSON.parse(meta.value.data.toHuman() as string)
                    : null,
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

  const filter = data?.length
    ? data.filter(
        meta => meta.collection_id !== general_join_collection?.collection_id
      )
    : null;

  return (
    <JohnPopover allowToggle>
      {filter?.length ? (
        filter.map(meta => (
          <JohnPopoverJSX
            key={meta.collection_id}
            id={meta.collection_id}
            name={meta.option?.title || '-'}
            image={meta.option?.image || null}
            onClick={() => {
              setValue(`general_join_collection`, meta);
            }}
          />
        ))
      ) : (
        <JohnPopoverEmpty />
      )}
    </JohnPopover>
  );
};
