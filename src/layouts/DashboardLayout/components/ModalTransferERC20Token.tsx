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
  Text,
  useToast,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useWallet } from 'use-wallet';

import NumberInput from '../../../components/numberInput/NumberInput';

import ERC20JSON from 'contract/ERC20.json';
import useWeb3 from 'hooks/useWeb3';
import { useSubstrateState } from 'substrate-lib';

interface Iprops {
  isOpen: boolean;
  onClose: () => void;
}

interface ITransferForm {
  tokenAddress: string;
  transferTo: string;
  amount: number;
}

interface ITokenInfo {
  symbol: string;
  balance: string;
}

const ModalTransferToken: React.FC<Iprops> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [txFee, setTxFee] = useState('');
  const { formatUnits, parseUnits } = ethers.utils;
  const [nativeTokenBalance, setNativeTokenBalance] = useState('');
  const { chainDecimal } = useSubstrateState();
  const [tokenInfo, setTokenInfo] = useState<ITokenInfo>();
  const { account } = useWallet();
  const web3 = useWeb3();
  const { toBN } = web3.utils;
  const toast = useToast();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ITransferForm>({
    defaultValues: {
      tokenAddress: '',
      transferTo: '',
      amount: 0,
    },
  });

  const tokenAddressField = register('tokenAddress', {
    required: t('PLEASE_ENTER_THE_TOKEN_ADDRESS'),
  });

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
        setValue('amount', 0);
      },
    }
  );

  const onSubmit = async (data: ITransferForm) => {
    const beforeBalance = await web3.eth.getBalance(account || '');
    setNativeTokenBalance(beforeBalance);
    mutation.mutate(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('TRANSFER_ERC20_TOKEN')}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel htmlFor="">{t('TOKEN_CONTRACT')}</FormLabel>
              <Input
                type="text"
                {...tokenAddressField}
                onChange={e => {
                  tokenAddressField.onChange(e);
                  getERC20TokenInfo(e.target.value);
                }}
              />
              <ErrorMessage
                errors={errors}
                name="tokenAddress"
                render={({ message }) => <Text color="red.400">{message}</Text>}
              />
              {tokenInfo && (
                <Text>
                  {t('YOUR_BALANCE_AMOUNT_GAKI', {
                    amount: formatUnits(
                      tokenInfo?.balance || '0',
                      chainDecimal
                    ),
                    symbol: tokenInfo.symbol,
                  })}
                </Text>
              )}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="">{t('TRANSFER_TO')}</FormLabel>
              <Input
                type="text"
                {...register('transferTo', {
                  required: t(
                    'PLEASE_ENTER_THE_ADDRESS_YOU_WANT_TO_TRANSFER_TO'
                  ),
                })}
              />
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
                      web3.utils.fromWei(tokenInfo?.balance || '0')
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
            {txFee && (
              <Text>
                {t('GAS_FEE_AMOUNT_GAKI', {
                  amount: txFee,
                })}
              </Text>
            )}
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
              isLoading={mutation.isLoading}
            >
              {t('TRANSFER')}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ModalTransferToken;
