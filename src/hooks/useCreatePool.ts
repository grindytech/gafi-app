import { useToast } from '@chakra-ui/react';
import { ISubmittableResult } from '@polkadot/types/types';
import { ethers } from 'ethers';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { getFromAcct, handleTxError } from 'components/utils';
import { ISponsoredPoolForm } from 'pages/SponsoredPool/components/ModalAddSponsoredPool';
import { useSubstrateState } from 'substrate-lib';

const useCreatePool = (onSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { api, currentAccount, chainDecimal } = useSubstrateState();
  const toast = useToast();
  const { t } = useTranslation();
  const { parseUnits } = ethers.utils;

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

  const createPoolMutation = useMutation(
    async (data: ISponsoredPoolForm) => {
      const [account, options] = await getFromAcct(currentAccount);
      const targets = data.targets.map(target => target.contractAddress);
      const txExecute = api?.tx.sponsoredPool.createPool(
        targets,
        parseUnits(data.poolAmount.toString(), chainDecimal).toString(),
        parseFloat(data.discount) * 10000,
        data.txLimit
      );
      if (options) return txExecute?.signAndSend(account, options, txCallback);
      return txExecute?.signAndSend(account, txCallback);
    },
    {
      mutationKey: 'create-pool',
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
      onSettled: (data, variables, context) => {
        console.log('data: ', data);
      },
    }
  );

  return {
    createPool: (data: ISponsoredPoolForm) => {
      setIsLoading(true);
      createPoolMutation.mutate(data);
    },
    isLoading,
  };
};

export default useCreatePool;
