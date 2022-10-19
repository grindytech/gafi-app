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
  VStack,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import { mdiClose, mdiDotsVertical, mdiPlus } from '@mdi/js';
import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useLoadWhitelist } from 'hooks/useLoadWhitelist';
import { useWhitelistSource } from 'hooks/useWhitelistSource';
import useWithdraw from 'hooks/useWithdraw';

export interface WhitelistForm {
  whitelist: { address: string }[];
}

interface IProps {
  poolId: string;
  onClick: () => void;
  onClickDetails: () => void;
}

const OwnedTableActions: React.FC<IProps> = ({
  poolId,
  onClick,
  onClickDetails,
}) => {
  const { t } = useTranslation();
  const { withdrawPoolBalance, isLoading } = useWithdraw();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { response } = useWhitelistSource(poolId);

  const {
    isLoadingEnableWhitelist,
    mutationEnableWhitelist,
    mutationWhitelist,
    data,
  } = useLoadWhitelist(poolId);

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

  useEffect(() => {
    if (data) {
      const whitelist = data?.map((item: string) => ({
        address: item,
      }));

      reset({
        whitelist,
      });
    }
  }, [data, reset]);

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

      mutationWhitelist.mutate({
        pool_id: poolId.replace('0x', ''),
        address,
      });
    }
  };

  return (
    <>
      <Text
        onClick={() => onClickDetails()}
        display={{
          sm: 'block',
          md: 'none',
        }}
        color="primary"
      >
        {t('DETAIL')}
      </Text>

      <Popover placement="bottom-start">
        <PopoverTrigger>
          <IconButton
            display={{
              sm: 'none',
              md: 'block',
            }}
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
              <MenuItem onClick={() => onClick()}>{t('EDIT')}</MenuItem>
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
                  isLoading={isLoadingEnableWhitelist}
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
