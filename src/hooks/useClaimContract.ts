import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import useLoadContracts from './useLoadContracts';
import useTxCallback from './useTxCallback';

import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct } from 'utils';

const useClaimContract = (onSuccess: () => void) => {
  const { t } = useTranslation();
  const toast = useToast();
  const { api, currentAccount } = useSubstrateState();
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useLoadContracts();

  const refetchData = () => {
    setIsLoading(false);
    onSuccess();
    refetch();
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
        setIsLoading(false);
      },
    }
  );

  const claimContract = (contractAddress: string) => {
    setIsLoading(true);
    mutation.mutate(contractAddress);
  };

  return {
    claimContract,
    isLoading,
  };
};

export default useClaimContract;
