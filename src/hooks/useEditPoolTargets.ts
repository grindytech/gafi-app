import { useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import useTxCallback from './useTxCallback';

import { useSubstrateState } from 'contexts/substrateContext';
import { ITargets } from 'pages/SponsoredPool/components/EditTargetsForm';
import { getFromAcct } from 'utils';

const useEditPoolTargets = (
  onSuccess: () => void,
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const { api, currentAccount } = useSubstrateState();
  const toast = useToast();
  const { t } = useTranslation();

  const refetch = () => {
    onSuccess();
  };

  const onFinalize = () => {
    setIsLoading(false);
    setIsPending(false);
  };

  const txCallback = useTxCallback(refetch, onFinalize);

  const poolTargetsMutation = useMutation(
    async (params: { targetsData: ITargets; poolId: string }) => {
      if (currentAccount) {
        const [account, options] = await getFromAcct(currentAccount);

        const newTargets = params.targetsData.map(
          target => target.contractAddress
        );

        const txSetNewTargets = api?.tx.sponsoredPool.newTargets(
          params.poolId,
          newTargets
        );

        return txSetNewTargets?.signAndSend(account, options || {}, txCallback);
      }
    },
    {
      mutationKey: 'update-target-contract',
      onError: (error: Error) => {
        toast({
          position: 'top-right',
          description: t('TRANSACTION_FAILED', {
            errorMessage: error.toString(),
          }),
          isClosable: true,
          status: 'error',
        });
        setIsPending(false);
        setIsLoading(false);
      },
    }
  );

  return {
    editPoolTargets: (targetsData: ITargets, poolId: string) => {
      setIsPending(false);
      setIsLoading(true);

      return poolTargetsMutation.mutate({ targetsData, poolId });
    },
    isLoading,
  };
};

export default useEditPoolTargets;
