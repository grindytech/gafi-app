import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast
} from '@chakra-ui/react';
import { ISubmittableResult } from '@polkadot/types/types';
import { BN, formatBalance } from '@polkadot/util';
import NumberInput from 'components/numberInput/NumberInput';
import { getFromAcct, handleTxError } from 'components/utils';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSubstrateState } from 'substrate-lib';


interface IProps {
  isOpen: boolean;
  onClose: () => void;
  pageNumberOfNewPool: number;
  setCurrentPage: any;
}

interface SponsoredPoolForm {
  targets: string[];
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
}) => {
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<SponsoredPoolForm>();
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
    const bytes = [];
    for (let i = 0; i < data.name.length; ++i) {
      const charCode = data.name.charCodeAt(i);
      bytes.push((charCode & 0xff00) >> 8);
      bytes.push(charCode & 0xff);
    }
    const convertedName = bytes.join('');
    if (api && account) {
      const txExecute = api.tx.sponsoredPool.createPool(
        ['0x560050700ae0733594F03762bAE68DaB9F50ae28'],
        // convertedName,
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

  console.log(
    'Number',
    formatBalance(
      currentAccountBalance,
      { withSi: false, forceUnit: '-' },
      chainDecimal || 18
    )
  );
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create sponsored pool</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="">Name</FormLabel>
              <Input
                id="name"
                type="text"
                {...register('name', { required: true })}
              />
            </FormControl>
            <FormControl>
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
            <FormControl>
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
