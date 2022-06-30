import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useMediaQuery,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useWallet } from 'use-wallet';
import Web3 from 'web3';

import { addAdditionalGas } from './DeployContract';

import Card from 'components/card/Card';
import ERC20JSON from 'contract/ERC20.json';

export const MAX_INT =
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

// const signed = await context.web3.eth.accounts.signTransaction(
//   options,
//   account.privateKey
// );
// const tx_hash = (
//   await customRequest(context.web3, 'eth_sendRawTransaction', [
//     signed.rawTransaction,
//   ])
// ).result;
// await createAndFinalizeBlock(context.web3);
// const receipt = await customRequest(context.web3, 'eth_getTransactionReceipt', [
//   tx_hash,
// ]);

const TransferToken = () => {
  const [txnFee, setTxnFee] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const toast = useToast();
  const { account, ethereum } = useWallet();
  const { register, handleSubmit } = useForm({
    defaultValues: { toUser: '', contractAddress: '' },
  });

  const onTransferMoney = async (data: {
    contractAddress: string;
    toUser: string;
  }) => {
    setIsLoading(true);
    if (account && ethereum) {
      const web3 = new Web3(ethereum);
      const beforeBalance = await web3.eth.getBalance(account);
      const userContract = new web3.eth.Contract(
        ERC20JSON.abi as any,
        data.contractAddress
      );
      const transferAmount = 1 * 10 * 18;
      try {
        const contract = await userContract.methods
          .transfer(data.toUser, transferAmount)
          .call();
        const gasLimit = await addAdditionalGas(contract, account);
        const options = {
          to: data.contractAddress,
          data: contract.encodeABI(),
          gas: gasLimit,
          gasPrice: await web3.eth.getGasPrice(),
        };
        await web3.eth.sendTransaction(options);
        const newBalance = await web3.eth.getBalance(account);
        setTxnFee(
          prevTxnFee =>
            prevTxnFee +
            Number(beforeBalance) -
            Number(newBalance) +
            transferAmount
        );
        toast({
          position: 'top-right',
          description: t('TRANSFER_SUCCESS'),
          isClosable: true,
          status: 'success',
        });
      } catch (error) {
        setIsLoading(false);
        toast({
          position: 'top-right',
          description: t('TRANSFER_ERROR'),
          isClosable: true,
          status: 'error',
        });
      }
    }
    setIsLoading(false);
  };

  return (
    <Card mt={5}>
      <form onSubmit={handleSubmit(onTransferMoney)}>
        <VStack minW="400px" gap={4}>
          <Text>Transfer Token To User</Text>
          <VStack alignItems="flex-start">
            <FormControl mb={4}>
              <FormLabel htmlFor="">To User</FormLabel>
              <Input
                id="toUser"
                type="text"
                {...register('toUser', { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="">Contract Address</FormLabel>
              <Input
                id="contractAddress"
                type="text"
                {...register('contractAddress', { required: true })}
              />
            </FormControl>
          </VStack>
          <VStack gap={2}>
            {txnFee && <Text>Total transaction fee: {txnFee / 10 ** 18}</Text>}
            <Button colorScheme="teal" isLoading={isLoading} type="submit">
              Transfer Token
            </Button>
          </VStack>
        </VStack>
      </form>
    </Card>
  );
};

export default TransferToken;
