import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import useTxCallback from './useTxCallback';

import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct } from 'utils';

const useChangeOwner = (onSuccess: () => void) => {
  const toast = useToast();
  const { t } = useTranslation();
  const { api, currentAccount } = useSubstrateState();
  const [isLoading, setIsLoading] = useState(false);

  const refetch = () => {
    setIsLoading(false);
    onSuccess();
  };

  const txCallback = useTxCallback(refetch);

  const mutation = useMutation(
    async (params: { contractAddress: string; ownerAddress: string }) => {
      const [account, options] = await getFromAcct(currentAccount);
      const txChangeContractOwnerExecute = api?.tx.gameCreator.changeOwnership(
        params.contractAddress,
        params.ownerAddress
      );
      return txChangeContractOwnerExecute?.signAndSend(
        account,
        options || {},
        txCallback
      );
    },
    {
      mutationKey: 'change-contract-onwer',
      onError: (error: any) => {
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

  const changeOwner = (contractAddress: string, ownerAddress: string) => {
    setIsLoading(true);
    mutation.mutate({ contractAddress, ownerAddress });
  };

  return {
    changeOwner,
    isLoading,
  };
};

export default useChangeOwner;
