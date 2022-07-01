import { useToast } from '@chakra-ui/react';
import { BigNumber } from '@ethersproject/bignumber';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWallet } from 'use-wallet';
import Web3 from 'web3';
import { ContractSendMethod } from 'web3-eth-contract';

export async function addAdditionalGas(
  contract: ContractSendMethod,
  address: string
) {
  const gasLimit = await contract.estimateGas({ from: address });
  const additionalGas = BigNumber.from(gasLimit.toString())
    .mul('50')
    .div('100');
  return BigNumber.from(gasLimit.toString()).add(additionalGas).toString();
}

const useDeploy = () => {
  const [contractFiles, setContractFiles] = useState<any>([]);
  const [contractAddresses, setContractAddresses] = useState<string[]>([]);
  const toast = useToast();
  const { account, isConnected, ethereum } = useWallet();
  const [txnFee, setTxnFee] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const onDeploy = async () => {
    setIsLoading(true);
    if (account && ethereum && contractFiles) {
      const web3 = new Web3(ethereum);
      const beforeBalance = await web3.eth.getBalance(account);
      await Promise.all(
        contractFiles.map(async (contractFile: any) => {
          const userContract = new web3.eth.Contract(contractFile.abi);
          const contractData = await userContract.deploy({
            data: contractFile.bytecode,
            arguments: [],
          });

          const options = {
            from: account,
            data: contractData.encodeABI(),
            gas: await addAdditionalGas(contractData, account),
            gasPrice: await web3.eth.getGasPrice(),
          };
          try {
            const result = await web3.eth.sendTransaction(options);
            setContractAddresses(prevState => [
              ...prevState,
              result.contractAddress || '',
            ]);
            const newBalance = await web3.eth.getBalance(account);
            setTxnFee(
              prevTxnFee =>
                prevTxnFee + Number(beforeBalance) - Number(newBalance)
            );
            toast({
              position: 'top-right',
              description: t('DEPLOY_NEW_CONTRACT_SUCCESS'),

              isClosable: true,
              status: 'success',
            });
          } catch (error) {
            setIsLoading(false);
            console.log('error :>> ', error);
          }
        })
      );
      setIsLoading(false);
    }
  };

  return {
    deploy: onDeploy,
    contractAddresses,
    txnFee,
    isLoading,
    isConnected,
    contractFiles,
    setContractFiles,
  };
};

export default useDeploy;
