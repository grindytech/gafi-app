import { Option, StorageKey, u32 } from '@polkadot/types';
import { PalletGameGameDetails } from '@polkadot/types/lookup';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from 'hooks/useRedux';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { CollectionsFieldProps } from '..';
import JohnPopover from 'layouts/John/JohnPopover';
import JohnPopoverJSX from 'layouts/John/JohnPopover/JohnPopoverJSX';
import JohnPopoverEmpty from 'layouts/John/JohnPopover/JohnPopoverEmpty';

interface CollectionsJohnGameMenuProps {
  setValue: UseFormSetValue<CollectionsFieldProps>;
  watch: UseFormWatch<CollectionsFieldProps>;
  address: string;
}

export default ({ setValue, address, watch }: CollectionsJohnGameMenuProps) => {
  const { api } = useAppSelector(state => state.substrate);
  const { general_join_game } = watch();

  const { data } = useQuery({
    queryKey: ['web3_collection_menu', address],
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
                  option: null,
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
        meta =>
          !general_join_game?.some(({ game_id }) => meta.game_id === game_id)
      )
    : null;

  return (
    <JohnPopover
      sx={{
        height: filter && filter?.length >= 2 ? '10rem' : '5rem',
      }}
    >
      {filter?.length ? (
        filter.map(meta => (
          <JohnPopoverJSX
            key={meta.game_id}
            id={meta.game_id}
            name="-"
            onClick={() => {
              setValue(`general_join_game.${meta.game_id}`, meta);
            }}
          />
        ))
      ) : (
        <JohnPopoverEmpty />
      )}
    </JohnPopover>
  );
};
