import { useToast } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useWallet } from 'use-wallet';

import useWeb3 from './useWeb3';

import { useSubstrateState } from 'contexts/substrateContext';
import ERC20JSON from 'contract/ERC20.json';

export interface ITransferForm {
  tokenAddress: string;
  transferTo: string;
  amount: number;
}

export interface ITokenInfo {
  symbol: string;
  balance: string;
}

const useTransferERC20 = () => {
  const web3 = useWeb3();
  const [nativeTokenBalance, setNativeTokenBalance] = useState('');
  const [txFee, setTxFee] = useState('');
  const [tokenInfo, setTokenInfo] = useState<ITokenInfo>();
  const { formatUnits, parseUnits } = ethers.utils;
  const toast = useToast();
  const { toBN } = web3.utils;
  const { account } = useWallet();
  const { chainDecimal } = useSubstrateState();
  const { t } = useTranslation();

  const getERC20TokenInfo = async (tokenContract: string) => {
    try {
      const userContract = new web3.eth.Contract(
        ERC20JSON.abi as any,
        tokenContract
      );
      const tokenBalance = await userContract.methods.balanceOf(account).call({
        from: account,
      });

      const symbol = await userContract.methods.symbol().call({
        from: account,
      });
      setTokenInfo({
        symbol,
        balance: tokenBalance,
      });
    } catch (error) {
      setTokenInfo(undefined);
    }
  };

  const mutation = useMutation(
    async (data: ITransferForm) => {
      const { tokenAddress, transferTo, amount } = data;
      const contract = new web3.eth.Contract(
        ERC20JSON.abi as any,
        tokenAddress
      );
      return contract.methods
        .transfer(
          transferTo,
          parseUnits(amount.toString(), chainDecimal).toString()
        )
        .send({
          from: account,
          gasPrice: await web3.eth.getGasPrice(),
        });
    },
    {
      mutationKey: 'transfer-erc20-token',
      onError: (error: any) => {
        toast({
          description: t('TRANSACTION_FAILED', {
            errorMessage: error.message,
          }),
          isClosable: true,
          status: 'error',
        });
      },
      onSuccess: async data => {
        toast({
          description: t('TRANSACTION_SUCCESS'),
          isClosable: true,
          status: 'success',
        });
        const newBalance = await web3.eth.getBalance(account || '');
        setTxFee(
          formatUnits(
            toBN(nativeTokenBalance).sub(toBN(newBalance)).toString(),
            chainDecimal
          )
        );
        getERC20TokenInfo(data.events.Transfer.address);
      },
    }
  );

  return {
    transferERC20: async (data: ITransferForm) => {
      const beforeBalance = await web3.eth.getBalance(account || '');
      setNativeTokenBalance(beforeBalance);
      mutation.mutate(data);
    },
    isLoading: mutation.isLoading,
    getERC20TokenInfo,
    tokenInfo,
    txFee,
  };
};

export default useTransferERC20;
