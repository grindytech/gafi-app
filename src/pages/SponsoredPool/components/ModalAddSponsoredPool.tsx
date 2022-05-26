import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
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
        description: `😉 Finalized. Block hash: ${status.asFinalized.toString()}`,
        isClosable: true,
        status: 'success',
      });
      setLoading(false);
      setCurrentPage(pageNumberOfNewPool);
      refetch();
      onClose();
    } else {
      toast({
        description: `Current transaction status: ${status.type}`,
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
        data.discount,
        data.txLimit
      );
      if (options) {
        try {
          await txExecute.signAndSend(account, options, txCallback);
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
          await txExecute.signAndSend(account, txCallback);
        } catch (err: any) {
          toast({
            description: `😞 Transaction Failed: ${err.toString()}`,
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
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create sponsored pool</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel htmlFor="">Pool amount</FormLabel>
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
              <FormLabel htmlFor="">Discount</FormLabel>
              <Input
                id="discount"
                type="text"
                {...register('discount', { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="">Transaction Limit</FormLabel>
              <Input
                id="txLimit"
                type="text"
                {...register('txLimit', { required: true })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="">Targets</FormLabel>
              <VStack alignItems="flex-start">
                {fields.map((field, index) => (
                  <InputGroup>
                    <Input
                      key={field.id}
                      type="text"
                      {...register(
                        `targets.${index}.contractAddress` as const,
                        {
                          required: true,
                        }
                      )}
                    />
                    <InputRightElement
                      display={fields.length === 1 ? 'none' : 'block'}
                    >
                      <IconButton
                        onClick={() => remove(index)}
                        colorScheme="red"
                        aria-label="remove target"
                        icon={
                          <Icon>
                            <path fill="currentColor" d={mdiClose} />
                          </Icon>
                        }
                      />
                    </InputRightElement>
                  </InputGroup>
                ))}
              </VStack>
            </FormControl>

            <Button
              disabled={fields.length >= 5}
              onClick={() => append({ contractAddress: '' })}
              leftIcon={
                <Icon>
                  <path fill="currentColor" d={mdiPlus} />
                </Icon>
              }
            >
              Add Target
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              type="submit"
              color="white"
              background="primary"
              variant="solid"
              isLoading={loading}
            >
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ModalAddSponsoredPool;
