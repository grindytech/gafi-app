import PoolsConfigEdit from '../PoolsConfig/PoolsConfigEdit';
import PoolsConfigSelect from '../PoolsConfig/PoolsConfigSelect';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { PoolsFieldProps } from '..';
import { useAccountContext } from 'contexts/contexts.account';

import { useQuery } from '@tanstack/react-query';
import PoolsConfigState from '../PoolsConfig/PoolsConfigState';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import swaggerAxios from 'axios/swagger.axios';
import { TypeSwaggerNFTData } from 'types/swagger.type';
import PoolsConfigProduct from '../PoolsConfig/PoolsConfigProduct';

interface PoolsNormalProps {
  setValue: UseFormSetValue<PoolsFieldProps>;
  watch: UseFormWatch<PoolsFieldProps>;
  register: UseFormRegister<PoolsFieldProps>;
}

export default ({ watch, register, setValue }: PoolsNormalProps) => {
  const { account } = useAccountContext();
  const { isOpen, onToggle, onClose } = useDisclosure();

  const toast = useToast();

  const { failed, supply, type_pool } = watch();

  const { data } = useQuery({
    queryKey: [`type_pool_nft/${account.current?.address}/${type_pool}`],
    queryFn: async () => {
      if (account.current?.address) {
        const service = await swaggerAxios.nftSearch({
          body: {
            query: {
              created_by: account.current.address,
            },
          },
        });

        if (type_pool === 'Dynamic Pool') {
          return service.data.filter(meta => !!meta?.supply);
        }

        if (type_pool === 'Stable Pool') {
          return service.data.filter(meta => !meta?.supply);
        }
      }

      return [];
    },
  });

  const product = Object.values(
    type_pool === 'Dynamic Pool'
      ? supply?.['Dynamic Pool'] || []
      : supply?.['Stable Pool'] || []
  ).filter(meta => !!meta);

  useEffect(() => {
    if (isOpen && !data?.length) {
      toast({
        description: "you don't have items",
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
      onClose();
    }
  }, [isOpen, data]);

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

      {isOpen && data?.length ? (
        <PoolsConfigProduct
          pool_type={type_pool}
          setValue={setValue}
          onClose={onClose}
          product={product}
          supply={data as TypeSwaggerNFTData['data']}
        />
      ) : null}
    </>
  );
};
