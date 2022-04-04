import { Box, Button, Text, useToast, VStack } from '@chakra-ui/react';
import { BigNumber } from '@ethersproject/bignumber';
import React, { useState } from 'react';
import { useWallet } from 'use-wallet';
import Web3 from 'web3';
import { ContractSendMethod } from 'web3-eth-contract';

import ERC20 from '../contract/ERC20.json';
import { useSubstrateState } from '../substrate-lib';

async function addAdditionalGas(contract: ContractSendMethod, address: string) {
  const gasLimit = await contract.estimateGas({ from: address });
  const additionalGas = BigNumber.from(gasLimit.toString())
    .mul('50')
    .div('100');
  return BigNumber.from(gasLimit.toString()).add(additionalGas).toString();
}

const DeployContract = () => {
  const toast = useToast();
  const { account, connect, isConnected, reset, balance, ethereum } =
    useWallet();
  const [txnFee, setTxnFee] = useState(0);
  const { api, keyring, currentAccount } = useSubstrateState();
  const [isLoading, setIsLoading] = useState(false);

  const onDeploy = async () => {
    setIsLoading(true);
    if (account && ethereum) {
      const web3 = new Web3(ethereum);
      const beforeBalance = await web3.eth.getBalance(account);
      // @ts-ignore
      const stakeContract = new web3.eth.Contract(ERC20.abi);
      const contractData = await stakeContract.deploy({
        data: ERC20.bytecode,
        arguments: [],
      });

      const options = {
        from: account,
        data: contractData.encodeABI(),
        gas: await addAdditionalGas(contractData, account),
      };
      try {
        await web3.eth.sendTransaction(options);
      } catch (error) {
        console.log('error :>> ', error);
      }
      const newBalance = await web3.eth.getBalance(account);
      setTxnFee(
        prevTxnFee => prevTxnFee + Number(beforeBalance) - Number(newBalance)
      );
      toast({
        description: `Deploy new contract success!`,
        isClosable: true,
        status: 'success',
        position: 'top-right',
      });
      setIsLoading(false);
    }
  };

  const onDeployBatch = async () => {
    onDeploy();
    onDeploy();
    onDeploy();
    onDeploy();
    onDeploy();
  };

  return (
    <Box>
      <Text fontWeight="bold" fontSize="2xl" mb={5}>
        Deploy Contract
      </Text>
      <VStack gap={2}>
        {txnFee && <Text>Total transaction fee: {txnFee / 10 ** 18}</Text>}
        <Button onClick={onDeploy} isLoading={isLoading}>
          Deploy contract
        </Button>
        <Button onClick={onDeployBatch}>Batch deploy</Button>
      </VStack>
    </Box>
  );
};

export default DeployContract;
