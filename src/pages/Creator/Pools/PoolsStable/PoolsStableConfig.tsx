import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { PoolsFieldProps } from '..';
import { useDisclosure, useToast } from '@chakra-ui/react';

import PoolsStable from '.';
import PoolsConfigEdit from '../PoolsConfig/PoolsConfigEdit';
import PoolsConfigSelect from '../PoolsConfig/PoolsConfigSelect';
import PoolsConfigState from '../PoolsConfig/PoolsConfigState';
import { useEffect } from 'react';
import { Option, u8 } from '@polkadot/types';
import { useQuery } from '@tanstack/react-query';
import { PalletNftsCollectionDetails } from '@polkadot/types/lookup';
import { useAccountContext } from 'contexts/contexts.account';
import { useSubstrateContext } from 'contexts/contexts.substrate';

interface PoolsDynamicConfigProps {
  setValue: UseFormSetValue<PoolsFieldProps>;
  watch: UseFormWatch<PoolsFieldProps>;
  register: UseFormRegister<PoolsFieldProps>;
}

export default ({ setValue, watch, register }: PoolsDynamicConfigProps) => {
  const { account } = useAccountContext();
  const { api } = useSubstrateContext();

  const { isOpen, onToggle, onClose } = useDisclosure();

  const { add_item_failed, add_item_stable } = watch();

  const toast = useToast();

  const { data: supplyOf } = useQuery({
    queryKey: ['creator_create_pool', account.current?.address],
    queryFn: async () => {
      if (api && account.current?.address) {
        const service = await api.query.game.supplyOf.entries();

        return Promise.all(
          service.map(async ([{ args }, supply]) => {
            const getRole = (await api.query.nfts.collectionRoleOf(
              args[0].toNumber(),
              account.current?.address
            )) as Option<u8>;

            const getOwner = (
              (await api.query.nfts.collection(
                args[0].toNumber()
              )) as Option<PalletNftsCollectionDetails>
            ).value.owner.toString();

            if (!supply.toHuman()) {
              if (getRole.isSome || getOwner === account.current?.address) {
                return {
                  collection_id: args[0].toNumber(),
                  nft_id: args[1].toNumber(),
                };
              }
            }
          })
        ).then(data =>
          data.filter((meta): meta is NonNullable<typeof meta> => !!meta)
        );
      }
    },
  });

  const product = Object.values(add_item_stable || []).filter(meta => !!meta);

  useEffect(() => {
    if (isOpen && !supplyOf?.length) {
      toast({
        description: `you don't have any item`,
        position: 'top-right',
        status: 'error',
        isClosable: true,
      });
      onClose();
    }
  }, [isOpen]);

  return (
    <>
      <PoolsConfigState
        setValue={setValue}
        add_key="add_item_stable"
        watch={add_item_stable}
      >
        <PoolsConfigEdit length={product.length} onToggle={onToggle} />

        <PoolsConfigSelect
          add_key="add_item_stable"
          register={register}
          product={product}
          onToggle={onToggle}
          add_item_failed={add_item_failed}
        />
      </PoolsConfigState>

      {isOpen && supplyOf?.length ? (
        <PoolsStable
          setValue={setValue}
          supplyOf={supplyOf}
          onClose={onClose}
          product={product}
        />
      ) : null}
    </>
  );
};
