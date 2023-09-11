import { UseFormGetValues } from 'react-hook-form';
import { PoolsFieldProps } from '..';
import { Button } from '@chakra-ui/react';
import { useAppSelector } from 'hooks/useRedux';

import useBlockTime from 'hooks/useBlockTime';
import { unitGAFI } from 'utils/utils';

interface PoolsModalSubmitProps {
  get_value_type?: {
    weight: number;
    amount: string | number;
    nft: { id: number; title: string; image: string };
    collection: { id: number; title: string; image: string };
  }[];
  isLoading: boolean;
  mutation: (submit: any) => void;
  getValues: UseFormGetValues<PoolsFieldProps>;
}

export default ({
  isLoading,
  mutation,
  get_value_type,
  getValues,
}: PoolsModalSubmitProps) => {
  const { account } = useAppSelector(state => state.injected.polkadot);
  const { api } = useAppSelector(state => state.substrate);

  const {
    general_title,
    general_description,
    add_item_fee,
    general_duration,
    general_type,
    collaborator,
  } = getValues();

  const { blockNumber } = useBlockTime('bestNumber');

  return (
    <Button
      mt={6}
      width="full"
      variant="primary"
      isLoading={isLoading}
      _hover={{}}
      onClick={() => {
        if (account?.address && get_value_type?.length) {
          const start = general_duration?.time ? blockNumber : null;

          const end = general_duration?.time
            ? blockNumber + general_duration.time
            : null;

          const modifield = get_value_type
            .filter(meta => !!meta)
            .map(meta => ({
              weight: meta.weight,
              maybeNft: meta?.collection
                ? { collection: meta.collection.id, item: meta.nft.id }
                : null,
            }));

          const mintSettings = {
            minType: 'Public',
            price: unitGAFI(String(add_item_fee)),
            startBlock: start,
            endBlock: end,
          };

          const meta = JSON.stringify({
            title: general_title,
            description: general_description,
          });

          if (general_type === 'Dynamic Pool') {
            mutation(
              api?.tx.game.createDynamicPoolWithData(
                modifield,
                collaborator.account.address,
                mintSettings,
                meta
              )
            );
          }

          if (general_type === 'Stable Pool') {
            mutation(
              api?.tx.game.createStablePoolWithData(
                modifield,
                collaborator.account.address,
                mintSettings,
                meta
              )
            );
          }
        }
      }}
    >
      Sign & Submit
    </Button>
  );
};
