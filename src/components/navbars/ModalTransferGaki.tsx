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
  Text,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import { ISubmittableResult } from '@polkadot/types/types';
import { BN } from '@polkadot/util';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import NumberInput from '../numberInput/NumberInput';
import { acctAddr, getFromAcct, handleTxError, shorten } from '../utils';

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

const ModalTransferGaki: React.FC<Iprops> = ({
  accountList,
  isOpen,
  onClose,
  accountBalance,
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { formatUnits, parseUnits } = ethers.utils;
  const handleClickSelection = (account: string) => {
    setValue('transferTo', account);
  };
  const { api, currentAccount, chainDecimal } = useSubstrateState();
  let currentAccountAddress = '';
  if (currentAccount) {
    currentAccountAddress = acctAddr(currentAccount);
  }
  const toast = useToast();
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ITransferForm>({
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
        parseUnits(amount.toString(), chainDecimal).toString()
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
      mutationKey: 'transfer-gaki',
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
        <ModalHeader>{t('TRANSFER_GAKI')}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel htmlFor="">{t('TRANSFER_TO')}</FormLabel>
              <Box sx={{ display: 'flex' }}>
                <Input
                  type="text"
                  {...register('transferTo', {
                    required: t(
                      'PLEASE_ENTER_THE_ADDRESS_YOU_WANT_TO_TRANSFER_TO'
                    ),
                  })}
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
                          {shorten(account)}
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Menu>
              </Box>
              <ErrorMessage
                errors={errors}
                name="transferTo"
                render={({ message }) => <Text color="red.400">{message}</Text>}
              />
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
                    max={parseFloat(
                      formatUnits(accountBalance.toString(), chainDecimal)
                    )}
                  />
                )}
                rules={{
                  min: {
                    value: 0.001,
                    message: t('AMOUNT_MUST_BE_GREATER_THAN_AMOUNT_GAKI', {
                      minAmount: 0.001,
                    }),
                  },
                  required: {
                    value: true,
                    message: t('PLEASE_ENTER_AMOUNT'),
                  },
                }}
              />
              <ErrorMessage
                errors={errors}
                name="amount"
                render={({ message }) => <Text color="red.400">{message}</Text>}
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

export default ModalTransferGaki;
