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

interface IModalEditPoolNameProps {
  poolId: string;
}

const EditPoolNameForm: React.FC<IModalEditPoolNameProps> = ({ poolId }) => {
  const { api, currentAccount } = useSubstrateState();
  const [isLoading, setIsLoading] = useState(false);
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

  const requiredAmountMsg = t(
    'NAME_MUST_BE_LONGER_THAN_MIN_AND_LESS_THAN_MAX_CHARACTERS',
    { min: 8, max: 32 }
  );

  const txCallback = ({ status, events }: ISubmittableResult) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        description: t('FINALIZED_BLOCK_HASH', {
          hash: status.asFinalized.toString(),
        }),
        isClosable: true,
        status: 'success',
      });
      setIsLoading(false);
    } else {
      toast({
        description: t('CURRENT_TRANSACTION_STATUS', {
          statusType: status.type,
        }),
        isClosable: true,
        status: 'info',
      });
    }
  };

  const mutation = useMutation(
    async (poolName: string) => {
      const [account, options] = await getFromAcct(currentAccount);
      const txSetPoolNameExecute = api?.tx.sponsoredPool.setPoolName(
        poolId,
        poolName
      );
      if (options) {
        return txSetPoolNameExecute?.signAndSend(
          account,
          options,
          txCallback
        ) as Promise<() => void>;
      }
      return txSetPoolNameExecute?.signAndSend(account, txCallback) as Promise<
        () => void
      >;
    },
    {
      mutationKey: 'update-pool-name',
      onError: (error: any) => {
        toast({
          description: t('TRANSACTION_FAILED', {
            errorMessage: error.toString(),
          }),
          isClosable: true,
          status: 'error',
        });
        setIsLoading(false);
      },
    }
  );

  const onSubmit = (data: IEditPoolNameForm) => {
    setIsLoading(true);
    mutation.mutate(data.poolName);
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
              message: requiredAmountMsg,
            },
            minLength: {
              value: 8,
              message: requiredAmountMsg,
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
          isLoading={isLoading}
        >
          {t('SAVE')}
        </Button>
      </HStack>
    </form>
  );
};
export default EditPoolNameForm;
