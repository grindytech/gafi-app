import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { mdiClose, mdiPlus } from '@mdi/js';
import { ISubmittableResult } from '@polkadot/types/types';
import { BN } from '@polkadot/util';
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import NumberInput from 'components/numberInput/NumberInput';
import { getFromAcct, handleTxError } from 'components/utils';
import { useSubstrateState } from 'substrate-lib';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  pageNumberOfNewPool: number;
  setCurrentPage: any;
  refetch: () => void;
}

interface SponsoredPoolForm {
  targets: { contractAddress: string }[];
  name: string;
  poolAmount: number;
  discount: string;
  txLimit: string;
}

const ModalAddSponsoredPool: React.FC<IProps> = ({
  isOpen,
  onClose,
  setCurrentPage,
  pageNumberOfNewPool,
  refetch,
}) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<SponsoredPoolForm>({
    defaultValues: { targets: [{ contractAddress: '' }] },
  });
  const { api, currentAccount, chainDecimal } = useSubstrateState();
  const [currentAccountBalance, setCurrentAccountBalance] = useState(
    new BN(0, 10)
  );
  const base = new BN(10, 10).pow(new BN(chainDecimal));

  useEffect(() => {
    let unsub = () => {};
    async function subscriptionBalance() {
      const [account] = await getFromAcct(currentAccount);

      // @ts-ignore
      unsub = await api?.query.system.account(
        account,
        ({ data: { free: currentFree }, nonce: currentNonce }: any) => {
          // Calculate the delta
          const change = currentFree.sub(currentAccountBalance);

          if (!change.isZero()) {
            setCurrentAccountBalance(currentFree);
          }
        }
      );
    }
    subscriptionBalance();
    return () => unsub();
  }, []);

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
      setCurrentPage(pageNumberOfNewPool);
      refetch();
      setLoading(false);
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

  const onSubmit = async (data: SponsoredPoolForm) => {
    setLoading(true);
    const [account, options] = await getFromAcct(currentAccount);
    if (api && account) {
      const targets = data.targets.map(target => target.contractAddress);
      const txExecute = api.tx.sponsoredPool.createPool(
        targets,
        new BN(data.poolAmount, 10).mul(base).toString(),
        parseFloat(data.discount) * 10000,
        data.txLimit
      );
      if (options) {
        try {
          await txExecute.signAndSend(account, options, txCallback);
        } catch (err: any) {
          toast({
            description: t('TRANSACTION_FAILED', {
              errorMessage: err.toString(),
            }),
            isClosable: true,
            status: 'error',
          });
          setLoading(false);
        }
      } else {
        try {
          await txExecute.signAndSend(account, txCallback);
        } catch (err: any) {
          toast({
            description: t('TRANSACTION_FAILED', {
              errorMessage: err.toString(),
            }),
            isClosable: true,
            status: 'error',
          });
          setLoading(false);
        }
      }
    }
  };

  const { fields, append, prepend, remove, swap, move, insert } =
    useFieldArray<SponsoredPoolForm>({
      control,
      name: 'targets',
    });

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} scrollBehavior="outside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader mb={10} fontWeight="bold" color="primary" fontSize="2xl">
          {t('CREATE_SPONSORED_POOL')}
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel fontSize="md" fontWeight="normal" htmlFor="">
                {t('POOL_AMOUNT')}
              </FormLabel>
              <Controller
                control={control}
                name="poolAmount"
                render={({ field }) => (
                  <NumberInput
                    value={field.value}
                    onChange={field.onChange}
                    max={currentAccountBalance.div(base).toNumber()}
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: 'REQUIRED_VALIDATION',
                  },
                }}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel fontSize="md" fontWeight="normal" htmlFor="">
                {t('DISCOUNT')}
              </FormLabel>
              <Input
                size="lg"
                id="discount"
                type="text"
                {...register('discount', { required: true })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel fontSize="md" fontWeight="normal" htmlFor="">
                {t('TRANSACTION_LIMIT')}
              </FormLabel>
              <Input
                size="lg"
                id="txLimit"
                type="text"
                {...register('txLimit', { required: true })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel fontSize="md" fontWeight="normal" htmlFor="">
                {t('TARGETS')}
              </FormLabel>
              <VStack alignItems="flex-start">
                {fields.map((field, index) => (
                  <InputGroup size="lg" display="flex" alignItems="center">
                    <Input
                      size="lg"
                      key={field.id}
                      type="text"
                      {...register(
                        `targets.${index}.contractAddress` as const,
                        {
                          required: true,
                        }
                      )}
                    />
                    <InputRightAddon
                      cursor="pointer"
                      _hover={{
                        opacity: 0.8,
                      }}
                      bg="red.500"
                      color="white"
                      fontSize="md"
                      fontWeight="bold"
                      display={fields.length === 1 ? 'none' : 'flex'}
                      onClick={() => remove(index)}
                    >
                      <Icon>
                        <path fill="currentColor" d={mdiClose} />
                      </Icon>
                    </InputRightAddon>
                  </InputGroup>
                ))}
              </VStack>
            </FormControl>

            <Button
              disabled={fields.length >= 5}
              variant="primary"
              size="sm"
              onClick={() => append({ contractAddress: '' })}
              leftIcon={
                <Icon w={18} h={18}>
                  <path fill="currentColor" d={mdiPlus} />
                </Icon>
              }
            >
              {t('ADD_TARGETS')}
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button size="sm" variant="transparent" mr={3} onClick={onClose}>
              {t('CANCEL')}
            </Button>
            <Button
              type="submit"
              color="white"
              size="sm"
              px={8}
              variant="solid"
              isLoading={loading}
            >
              {t('SAVE')}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ModalAddSponsoredPool;
