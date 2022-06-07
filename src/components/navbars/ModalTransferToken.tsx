import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import { ISubmittableResult } from '@polkadot/types/types';
import { BN } from '@polkadot/util';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import NumberInput from '../numberInput/NumberInput';
import { acctAddr, getFromAcct, handleTxError } from '../utils';

import { useSubstrateState } from 'substrate-lib';

interface Iprops {
  accountList?: string[];
  isOpen: boolean;
  onClose: () => void;
  accountBalance: BN;
}

interface ITransferForm {
  transferTo: string;
  amount: number;
}

const ModalTransferToken: React.FC<Iprops> = ({
  accountList,
  isOpen,
  onClose,
  accountBalance,
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleClickSelection = (account: string) => {
    setValue('transferTo', account);
  };
  const { api, chainDecimal, currentAccount } = useSubstrateState();
  let currentAccountAddress = '';
  if (currentAccount) {
    currentAccountAddress = acctAddr(currentAccount);
  }
  const base = new BN(10, 10).pow(new BN(chainDecimal - 4));
  const toast = useToast();
  const { register, handleSubmit, control, reset, setValue } =
    useForm<ITransferForm>({
      defaultValues: {
        transferTo: '',
        amount: 0,
      },
    });

  const txCallback = ({ status, events }: ISubmittableResult) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        description: t('TRANSFER_SUCCESS'),
        isClosable: true,
        status: 'success',
      });
      reset();
      setIsLoading(false);
      onClose();
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
    async (data: ITransferForm) => {
      const { transferTo, amount } = data;
      const [account, options] = await getFromAcct(currentAccount);
      const txTransferToken = api?.tx.balances.transfer(
        transferTo,
        new BN(amount * 10000).mul(base).toString()
      );
      if (options) {
        return txTransferToken?.signAndSend(
          account,
          options,
          txCallback
        ) as Promise<() => void>;
      }
      return txTransferToken?.signAndSend(account, txCallback) as Promise<
        () => void
      >;
    },
    {
      mutationKey: 'transfer-token',
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

  const onSubmit = (data: ITransferForm) => {
    setIsLoading(true);
    mutation.mutate(data);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('TRANSFER_TOKEN')}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel htmlFor="">{t('TRANSFER_TO')}</FormLabel>
              <Box sx={{ display: 'flex' }}>
                <Input
                  type="text"
                  {...register('transferTo', { required: true })}
                />
                <Menu>
                  <MenuButton
                    ml={3}
                    as={IconButton}
                    icon={<Icon size={1} path={mdiChevronDown} />}
                  />
                  <MenuList zIndex={99}>
                    {accountList?.map(account => {
                      if (currentAccountAddress === account) {
                        return null;
                      }
                      return (
                        <MenuItem
                          onClick={() => {
                            handleClickSelection(account);
                          }}
                        >
                          {account}
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Menu>
              </Box>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="">{t('TOKEN_AMOUNT')}</FormLabel>
              <Controller
                control={control}
                name="amount"
                render={({ field }) => (
                  <NumberInput
                    value={field.value}
                    onChange={field.onChange}
                    max={
                      parseFloat(accountBalance.div(base).toString()) / 10000
                    }
                  />
                )}
                rules={{
                  min: 0.0001,
                  required: {
                    value: true,
                    message: 'REQUIRED_VALIDATION',
                  },
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              {t('CLOSE')}
            </Button>
            <Button
              type="submit"
              color="white"
              background="primary"
              variant="solid"
              isLoading={isLoading}
            >
              {t('TRANSFER')}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ModalTransferToken;
