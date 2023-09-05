import { UseFormWatch } from 'react-hook-form';
import { PoolsFieldProps } from '..';
import { Button } from '@chakra-ui/react';
import { useAppSelector } from 'hooks/useRedux';

import useBlockTime from 'hooks/useBlockTime';
import { unitGAFI } from 'utils/utils';

interface PoolsModalSubmitProps {
  getValues?: {
    weight: number;
    amount: string | number;
    nft: { id: number; title: string; image: string };
    collection: { id: number; title: string; image: string };
  }[];
  mutation: (submit: any) => void;
  isLoading: boolean;
  watch: UseFormWatch<PoolsFieldProps>;
}

export default ({
  getValues,
  isLoading,
  mutation,
  watch,
}: PoolsModalSubmitProps) => {
  const { account } = useAppSelector(state => state.injected.polkadot);
  const { api } = useAppSelector(state => state.substrate);

  const { add_item_fee, general_duration, general_type } = watch();

  const { blockNumber } = useBlockTime('bestNumber');

  return (
    <Button
      mt={6}
      width="full"
      variant="primary"
      isLoading={isLoading}
      _hover={{}}
      onClick={() => {
        if (getValues && account?.address) {
          const start = general_duration?.time ? blockNumber : null;

          const end = general_duration?.time
            ? blockNumber + general_duration.time
            : null;

          const modifield = getValues.map(meta => ({
            weight: meta.weight,
            maybeNft: meta.collection
              ? {
                  collection: meta.collection.id,
                  item: meta.nft.id,
                }
              : null,
          }));

          const mintSetting = {
            minType: 'Public',
            price: unitGAFI(String(add_item_fee)),
            startBlock: start,
            endBlock: end,
          };

          if (general_type === 'Dynamic Pool') {
            mutation(
              api?.tx.game.createDynamicPool(
                modifield,
                account.address,
                mintSetting
              )
            );
          }

          if (general_type === 'Stable Pool') {
            mutation(
              api?.tx.game.createStablePool(
                modifield,
                account.address,
                mintSetting
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
