import { useToast } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import useTxCallback from './useTxCallback';

import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct } from 'utils';

interface IMutationParams {
  transferTo: string;
  amount: number;
}

const useTransferGaki = (refetch: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { api, currentAccount, chainDecimal } = useSubstrateState();
  const toast = useToast();
  const { t } = useTranslation();
  const { parseUnits } = ethers.utils;

  const onSucess = () => {
    refetch();
  };

  const onFinalize = () => {
    setIsLoading(false);
  };

  const txCallback = useTxCallback(onSucess, onFinalize, 'TRANSFER_SUCCESS');

  const mutation = useMutation(
    async ({ transferTo, amount }: IMutationParams) => {
      if (currentAccount) {
        const [account, options] = await getFromAcct(currentAccount);
        const txTransferToken = api?.tx.balances.transfer(
          transferTo,
          parseUnits(amount.toString(), chainDecimal).toString()
        );
        return txTransferToken?.signAndSend(account, options || {}, txCallback);
      }
    },
    {
      mutationKey: 'transfer-gaki',
      onError: (error: Error) => {
        toast({
          position: 'top-right',
          description: t('TRANSACTION_FAILED', {
            errorMessage: error.toString(),
          }),
          isClosable: true,
          status: 'error',
        });
        setIsLoading(false);
      },
    }
  );

  return {
    transferGaki: (transferTo: string, amount: number) => {
      setIsLoading(true);
      mutation.mutate({
        transferTo,
        amount,
      });
    },
    isLoading,
  };
};

export default useTransferGaki;
