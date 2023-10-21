import PoolsConfigEdit from '../PoolsConfig/PoolsConfigEdit';
import PoolsConfigSelect from '../PoolsConfig/PoolsConfigSelect';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { PoolsFieldProps } from '..';
import { useAccountContext } from 'contexts/contexts.account';

import PoolsDynamic from '../PoolsConfig/PoolsConfigProduct';
import { useSubstrateContext } from 'contexts/contexts.substrate';
import { useQuery } from '@tanstack/react-query';
import { Option, u8 } from '@polkadot/types';
import PoolsConfigState from '../PoolsConfig/PoolsConfigState';
import { useDisclosure, useToast } from '@chakra-ui/react';
import useItemBalanceOf from 'hooks/useItemBalanceOf';
import { useEffect } from 'react';

interface PoolsNormalProps {
  setValue: UseFormSetValue<PoolsFieldProps>;
  watch: UseFormWatch<PoolsFieldProps>;
  register: UseFormRegister<PoolsFieldProps>;
}

export default ({ watch, register, setValue }: PoolsNormalProps) => {
  const { api } = useSubstrateContext();
  const { account } = useAccountContext();
  const { isOpen, onToggle, onClose } = useDisclosure();

  const toast = useToast();

  const { failed, supply, type_pool } = watch();

  const { itemBalanceOf } = useItemBalanceOf({
    filter: 'address',
    key: `${type_pool}/${account.current?.address}`,
    arg: [account.current?.address as string],
  });

  const { data: supplyOf } = useQuery({
    queryKey: [`type_pool/${account.current?.address}`],
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
              await api.query.nfts.collection(args[0].toNumber())
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

  const product = Object.values(
    type_pool === 'Dynamic Pool'
      ? supply?.['Dynamic Pool'] || []
      : supply?.['Stable Pool'] || []
  ).filter(meta => !!meta);

  useEffect(() => {
    if (isOpen && (!supplyOf?.length || !itemBalanceOf?.length)) {
      toast({
        description: "you don't have items",
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
      onClose();
    }
  }, [isOpen, supplyOf, itemBalanceOf]);

  return (
    <>
      <PoolsConfigState
        add_key={type_pool}
        setValue={setValue}
        value={!!product?.length}
      >
        <PoolsConfigEdit length={product?.length} onToggle={onToggle} />

        <PoolsConfigSelect
          onToggle={onToggle}
          type_pool={type_pool}
          register={register}
          product={product}
          failed={failed}
        />
      </PoolsConfigState>

      {isOpen && (supplyOf?.length || itemBalanceOf?.length) ? (
        <PoolsDynamic
          pool_type={type_pool}
          setValue={setValue}
          onClose={onClose}
          product={product}
          supply={
            itemBalanceOf?.length && type_pool === 'Dynamic Pool'
              ? itemBalanceOf.map(({ collection_id, nft_id, amount }) => ({
                  collection_id,
                  nft_id,
                  amount,
                }))
              : supplyOf?.length && type_pool === 'Stable Pool'
              ? supplyOf.map(({ collection_id, nft_id }) => ({
                  collection_id,
                  nft_id,
                  amount: null,
                }))
              : undefined
          }
        />
      ) : null}
    </>
  );
};
