import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import { ethers } from 'ethers';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import NumberInput from '../../../components/numberInput/NumberInput';

import { useSubstrateState } from 'contexts/substrateContext';
import useTransferERC20, { ITransferForm } from 'hooks/useTransferERC20';
import useWeb3 from 'hooks/useWeb3';

interface Iprops {
  isOpen: boolean;
  onClose: () => void;
}

const ModalTransferToken: React.FC<Iprops> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { formatUnits } = ethers.utils;
  const { chainDecimal } = useSubstrateState();
  const web3 = useWeb3();
  const {
    register,
    handleSubmit,
    control,
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

  const { transferERC20, isLoading, getERC20TokenInfo, tokenInfo, txFee } =
    useTransferERC20();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('TRANSFER_ERC20_TOKEN')}</ModalHeader>
        <form
          onSubmit={handleSubmit((data: ITransferForm) => {
            transferERC20(data);
          })}
        >
          <ModalBody>
            <FormControl isRequired mb={4}>
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
            <FormControl isRequired mb={4}>
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
            <FormControl isRequired mb={4}>
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
            <Button
              type="submit"
              size="sm"
              variant="primary"
              isLoading={isLoading}
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
