import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import { getFromAcct, handleTxError } from 'components/utils';
import { useSubstrateState } from 'substrate-lib';
import { t } from 'i18next';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ISubmittableResult } from '@polkadot/types/types';
import { useMutation } from 'react-query';
import { AddressOrPair, SignerOptions } from '@polkadot/api/types';

interface IEditPoolNameForm {
  poolName: string;
}

interface IRequestData {
  poolName: string;
  account: AddressOrPair;
  options?: Partial<SignerOptions>;
}

interface IModalEditPoolNameProps {
  poolId: string;
}

const EditPoolNameForm: React.FC<IModalEditPoolNameProps> = ({ poolId }) => {
  const [loading, setLoading] = useState(false);
  const { api, currentAccount } = useSubstrateState();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditPoolNameForm>({
    defaultValues: {
      poolName: '',
    },
  });

  const txCallback = ({ status, events }: ISubmittableResult) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        description: `😉 Finalized. Block hash: ${status.asFinalized.toString()}`,
        isClosable: true,
        status: 'success',
      });
      setLoading(false);
    } else {
      toast({
        description: `Current transaction status: ${status.type}`,
        isClosable: true,
        status: 'info',
      });
    }
  };

  const mutation = useMutation(
    (data: IRequestData) => {
      const { poolName, account, options } = data;
      const txSetPoolNameExecute = api?.tx.sponsoredPool.setPoolName(
        poolId,
        poolName
      );
      if (options)
        return txSetPoolNameExecute?.signAndSend(
          account,
          options,
          txCallback
        ) as Promise<() => void>;
      return txSetPoolNameExecute?.signAndSend(account, txCallback) as Promise<
        () => void
      >;
    },
    {
      mutationKey: 'update-pool-name',
      onError: (error: any) => {
        toast({
          description: `😞 Transaction Failed: ${error.toString()}`,
          isClosable: true,
          status: 'error',
        });
        setLoading(false);
      },
    }
  );

  const onSubmit = async (data: IEditPoolNameForm) => {
    setLoading(true);
    const [account, options] = await getFromAcct(currentAccount);
    mutation.mutate({ poolName: data.poolName, account, options });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.poolName} isRequired mb={4}>
        <FormLabel htmlFor="">{t('NAME')}</FormLabel>
        <Input
          id="poolName"
          type="text"
          {...register('poolName', {
            required: true,
            maxLength: {
              value: 32,
              message: t('NAME_MUST_BE', { min: 8, max: 32 }),
            },
            minLength: {
              value: 8,
              message: t('NAME_MUST_BE', { min: 8, max: 32 }),
            },
          })}
        />
      </FormControl>

      <ErrorMessage
        errors={errors}
        name="poolName"
        render={({ message }) => <Text color="red.500">{message} 😱</Text>}
      />
      <HStack justifyContent="flex-end">
        <Button
          type="submit"
          color="white"
          background="primary"
          variant="solid"
          isLoading={loading}
        >
          {t('SAVE')}
        </Button>
      </HStack>
    </form>
  );
};
export default EditPoolNameForm;
