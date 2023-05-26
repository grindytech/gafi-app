import { useToast } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import useTxCallback from './useTxCallback';

import { useSubstrateState } from 'contexts/substrateContext';
import { ISponsoredPoolForm } from 'pages/SponsoredPool/components/ModalAddSponsoredPool';
import { getFromAcct } from 'utils';

const useCreatePool = (onSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { api, currentAccount, chainDecimal } = useSubstrateState();
  const toast = useToast();
  const { t } = useTranslation();
  const { parseUnits } = ethers.utils;

  const refetch = () => {
    onSuccess();
  };

  const onFinalize = () => {
    setIsLoading(false);
  };

  const txCallback = useTxCallback(refetch, onFinalize);

  const createPoolMutation = useMutation(
    async (data: ISponsoredPoolForm) => {
      if (!currentAccount) {
        return;
      }

      const [account, options] = await getFromAcct(currentAccount);

      const targets = data.targets.map(target => target.contractAddress);

      const txExecute = api?.tx.sponsoredPool.createPool(
        targets,
        parseUnits(data.poolAmount.toString(), chainDecimal).toString(),
        parseFloat(data.discount) * 10000,
        data.txLimit
      );

      return txExecute?.signAndSend(account, options || {}, txCallback);
    },
    {
      mutationKey: 'create-pool',
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
    createPool: (data: ISponsoredPoolForm) => {
      createPoolMutation.mutate(data);
      setIsLoading(true);
    },
    isLoading,
  };
};

export default useCreatePool;
