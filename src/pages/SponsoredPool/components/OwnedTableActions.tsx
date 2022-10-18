import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Menu,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import { mdiClose, mdiDotsVertical, mdiPlus } from '@mdi/js';
import * as axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';

import config from 'config';
import { useSubstrateState } from 'contexts/substrateContext';
import useTxCallback from 'hooks/useTxCallback';
import { useWhitelistSource } from 'hooks/useWhitelistSource';
import useWithdraw from 'hooks/useWithdraw';
import { getFromAcct } from 'utils';

export interface WhitelistForm {
  whitelist: { address: string }[];
}

interface WhitelistSetRequest {
  pool_id: string;
  address: string[];
}

interface IProps {
  poolId: string;
  onClick: () => void;
}

const httpHandler = axios.default.create({
  baseURL: config.WHITELIST_DEFAULT_URL,
});

const OwnedTableActions: React.FC<IProps> = ({ poolId, onClick }) => {
  const toast = useToast();
  const { t } = useTranslation();
  const { withdrawPoolBalance, isLoading } = useWithdraw();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { api, currentAccount } = useSubstrateState();
  const [isLoadingEnableWhitelist, setIsLoadingEnableWhitelist] =
    useState(false);

  const txCallback = useTxCallback(() => setIsLoadingEnableWhitelist(false));

  const { response } = useWhitelistSource(poolId);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<WhitelistForm>({
    defaultValues: {
      whitelist: [{ address: '' }],
    },
  });

  const { fields, remove, append } = useFieldArray<WhitelistForm>({
    control,
    name: 'whitelist',
  });

  const { data, isLoading: isLoadingWhitelist } = useQuery(
    ['queryPoolWhitelist', poolId],
    async (): Promise<string[]> => {
      const res = await httpHandler.get(
        `/get?pool_id=${poolId.replace('0x', '')}`
      );
      return res.data;
    },
    { enabled: !!poolId, staleTime: 60000 }
  );

  const setWhitelistAddressURL = !data ? '/create' : '/add';

  useEffect(() => {
    if (data) {
      const whitelist = data.map((item: string) => ({
        address: item,
      }));
      reset({ whitelist });
    }
  }, [data, reset]);

  const mutationEnableWhitelist = useMutation(
    async () => {
      setIsLoadingEnableWhitelist(true);
      const [account, options] = await getFromAcct(currentAccount);
      const txChangeContractOwnerExecute =
        api?.tx.palletWhitelist.enableWhitelist(
          poolId,
          'https://whitelist.gafi.network'
        );
      return txChangeContractOwnerExecute?.signAndSend(
        account,
        options || {},
        txCallback
      );
    },
    {
      mutationKey: 'change-contract-onwer',
      onError: (error: any) => {
        toast({
          position: 'top-right',
          description: t('TRANSACTION_FAILED', {
            errorMessage: error.toString(),
          }),
          isClosable: true,
          status: 'error',
        });
        setIsLoadingEnableWhitelist(false);
      },
    }
  );

  const mutation = useMutation(
    async (whitelistData: WhitelistSetRequest): Promise<void> => {
      await httpHandler.post(setWhitelistAddressURL, whitelistData);
    },
    {
      onSuccess: () => {
        toast({
          position: 'top-right',
          description: t('ADD_ADDRESS_TO_WHITELIST_SUCCESSFULLY'),
          isClosable: true,
          status: 'success',
        });
        onClose();
      },
      onError: error => {
        console.log('error', (error as axios.AxiosError).message);
      },
    }
  );

  const onSubmit = (submitData: WhitelistForm) => {
    const address = submitData.whitelist
      .map(item => {
        if (!data?.includes(item.address)) {
          return item.address;
        }
        return undefined;
      })
      .filter((item): item is string => !!item);

    if (address.length > 0) {
      if (!response) {
        mutationEnableWhitelist.mutate();
      }
      mutation.mutate({ pool_id: poolId.replace('0x', ''), address });
    }
  };

  return (
    <>
      <Text
        display={{
          sm: 'block',
          '2xl': 'none',
        }}
        color="primary"
      >
        {t('DETAIL')}
      </Text>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <IconButton
            aria-label="sponsored pool actions"
            variant="ghost"
            icon={
              <Icon w={10} color="primary">
                <path fill="currentColor" d={mdiDotsVertical} />
              </Icon>
            }
          />
        </PopoverTrigger>
        <PopoverContent w="full">
          <Menu isOpen>
            <MenuList zIndex={5}>
              <MenuItem
                onClick={e => {
                  onClick();
                }}
              >
                {t('EDIT')}
              </MenuItem>
              <MenuItem onClick={onOpen}>{t('SET_WHITELIST')}</MenuItem>
              <MenuItem
                isDisabled={isLoading}
                onClick={() => withdrawPoolBalance(poolId)}
              >
                {t('WITHDRAW')}
              </MenuItem>
            </MenuList>
          </Menu>
        </PopoverContent>
      </Popover>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Set pool whitelist</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormLabel htmlFor="">{t('WHITELIST')}</FormLabel>
              {React.Children.toArray(
                fields.map((field, index) => (
                  <FormControl
                    isInvalid={
                      !!errors.whitelist &&
                      !!errors.whitelist[index] &&
                      !!errors.whitelist[index].address
                    }
                    isRequired
                    mb={4}
                  >
                    <VStack alignItems="flex-start">
                      <InputGroup size="lg" display="flex" alignItems="center">
                        <Input
                          size="lg"
                          key={field.id}
                          sx={{
                            borderRadius: '0.375rem 0 0 0.375rem',
                          }}
                          type="text"
                          {...register(`whitelist.${index}.address`, {
                            required: true,
                            validate: (fieldData: string) => {
                              const listAddress = watch('whitelist').map(
                                item => item.address
                              );
                              const existTimes = listAddress.reduce(
                                (
                                  prevValue: Record<string, number>,
                                  currentValue
                                ) => ({
                                  ...prevValue,
                                  [currentValue]: prevValue[currentValue]
                                    ? prevValue[currentValue] + 1
                                    : 1,
                                }),
                                {}
                              );

                              if (existTimes[fieldData] > 1) {
                                return 'Duplicate item';
                              }
                            },
                          })}
                        />
                        <IconButton
                          display={fields.length === 1 ? 'none' : 'flex'}
                          onClick={() => remove(index)}
                          sx={{
                            borderRadius: '0 0.375rem 0.375rem 0',
                          }}
                          aria-label="remove address"
                          variant="delete"
                          icon={
                            <Icon>
                              <path fill="currentColor" d={mdiClose} />
                            </Icon>
                          }
                        />
                      </InputGroup>
                    </VStack>
                    <ErrorMessage
                      errors={errors}
                      name={`whitelist.${index}.address`}
                      render={({ message }) => (
                        <Text color="red.500">{message} 😱</Text>
                      )}
                    />
                  </FormControl>
                ))
              )}

              <Button
                disabled={fields.length >= 5}
                variant="primary"
                size="sm"
                onClick={() => append({ address: '' })}
                leftIcon={
                  <Icon w={18} h={18}>
                    <path fill="currentColor" d={mdiPlus} />
                  </Icon>
                }
              >
                {t('ADD_ADDRESS')}
              </Button>

              <HStack justifyContent="flex-end">
                <Button
                  type="submit"
                  color="white"
                  size="sm"
                  px={8}
                  variant="solid"
                  isLoading={isLoadingWhitelist}
                >
                  {t('SAVE')}
                </Button>
              </HStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OwnedTableActions;
