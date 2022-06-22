import { useToast } from '@chakra-ui/react';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { ISubmittableResult } from '@polkadot/types/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import useLoadContracts from './useLoadContracts';

import { getFromAcct, handleTxError } from 'components/utils';
import { useSubstrateState } from 'contexts/substrateContext';

const useClaimContract = (onSuccess: () => void) => {
  const { t } = useTranslation();
  const toast = useToast();
  const { api, currentAccount } = useSubstrateState();
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useLoadContracts();

  const txCallback = ({ status, events }: ISubmittableResult) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        description: t('FINALIZED_BLOCK_HASH', {
          hash: status.asFinalized.toString(),
        }),
        isClosable: true,
        status: 'success',
      });
      setIsLoading(false);
      refetch();
      onSuccess();
    } else {
      toast({
        description: t('CURRENT_TRANSACTION_STATUS', {
          statusType: status.type,
        }),
        isClosable: true,
        status: 'info',
      });
    }
  };

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
