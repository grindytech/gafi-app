import {
  Button,
  FormControl,
  FormLabel,
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

interface IEditPoolNameForm {
  poolName: string;
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

  const onSubmit = async (data: IEditPoolNameForm) => {
    setLoading(true);
    const [account, options] = await getFromAcct(currentAccount);
    const txSetPoolNameExecute = api?.tx.sponsoredPool.setPoolName(
      poolId,
      data.poolName
    );
    if (options) {
      try {
        await txSetPoolNameExecute?.signAndSend(account, options, txCallback);
      } catch (err: any) {
        toast({
          description: `😞 Transaction Failed: ${err.toString()}`,
          isClosable: true,
          status: 'error',
        });
        setLoading(false);
      }
    } else {
      try {
        await txSetPoolNameExecute?.signAndSend(account, txCallback);
      } catch (err: any) {
        toast({
          description: `😞 Transaction Failed: ${err.toString()}`,
          isClosable: true,
          status: 'error',
        });
        setLoading(false);
      }
    }
  };
  return (
    <>
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
                message: t(
                  'NAME_MUST_BE_LONGER_THAN_8_AND_LESS_THAN_32'
                ).toString(),
              },
              minLength: {
                value: 8,
                message: t(
                  'NAME_MUST_BE_LONGER_THAN_8_AND_LESS_THAN_32'
                ).toString(),
              },
            })}
          />
        </FormControl>

        <ErrorMessage
          errors={errors}
          name="poolName"
          render={({ message }) => <Text color="red.500">{message} 😱</Text>}
        />
        <Button
          float="right"
          type="submit"
          color="white"
          background="primary"
          variant="solid"
          isLoading={loading}
        >
          {t('SAVE')}
        </Button>
      </form>
    </>
  );
};
export default EditPoolNameForm;
