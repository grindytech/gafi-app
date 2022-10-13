import { useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import useTxCallback from './useTxCallback';

import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct } from 'utils';

const useChangeOwner = (
  onSuccess: () => void,
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const toast = useToast();
  const { t } = useTranslation();
  const { api, currentAccount } = useSubstrateState();
  const [isLoading, setIsLoading] = useState(false);

  const refetchData = () => {
    refetchLoad('false');
    onSuccess();
  };

  const refetchLoad = (type: string) => {
    if (type === 'false') {
      setIsLoading(false);
      setIsPending(false);
    }
    if (type === 'true') {
      setIsLoading(true);
      setIsPending(true);
    }
  };

  const txCallback = useTxCallback(refetchData);

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
        refetchLoad('false');
      },
    }
  );

  const changeOwner = (contractAddress: string, ownerAddress: string) => {
    refetchLoad('true');

    mutation.mutate({ contractAddress, ownerAddress });
  };

  return {
    changeOwner,
    isLoading,
  };
};

export default useChangeOwner;
