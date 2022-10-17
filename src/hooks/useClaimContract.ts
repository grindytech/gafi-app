import { useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import useLoadContracts from './useLoadContracts';
import useTxCallback from './useTxCallback';

import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct } from 'utils';

const useClaimContract = (
  onSuccess: () => void,
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { t } = useTranslation();
  const toast = useToast();
  const { api, currentAccount } = useSubstrateState();
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useLoadContracts();

  const refetchData = () => {
    refetchLoad(false);
    onSuccess();
    refetch();
  };

  const refetchLoad = (type: boolean) => {
    if (type === false) {
      setIsLoading(false);
      setIsPending(false);
    }
    if (type === true) {
      setIsLoading(true);
      setIsPending(true);
    }
  };

  const txCallback = useTxCallback(refetchData);

  const mutation = useMutation(
    async (contractAddress: string) => {
      const [account, options] = await getFromAcct(currentAccount);
      const txClaimContractExecute =
        api?.tx.gameCreator.claimContract(contractAddress);
      return txClaimContractExecute?.signAndSend(
        account,
        options || {},
        txCallback
      );
    },
    {
      mutationKey: 'claim-contract',
      onError: (error: any) => {
        toast({
          position: 'top-right',
          description: t('TRANSACTION_FAILED', {
            errorMessage: error.toString(),
          }),
          isClosable: true,
          status: 'error',
        });
        refetchLoad(false);
      },
    }
  );

  const claimContract = (contractAddress: string) => {
    refetchLoad(true);

    return mutation.mutate(contractAddress);
  };

  return {
    claimContract,
    isLoading,
  };
};

export default useClaimContract;
