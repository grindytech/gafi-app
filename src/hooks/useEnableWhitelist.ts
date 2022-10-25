import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import useTxCallback from './useTxCallback';

import config from 'config';
import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct } from 'utils';

const useEnableWhitelist = (poolId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentAccount, api } = useSubstrateState();
  const txCallback = useTxCallback(
    () => {},
    () => {
      setIsLoading(false);
    }
  );
  const toast = useToast();
  const { t } = useTranslation();

  const mutationEnableWhitelist = useMutation(
    async () => {
      setIsLoading(true);
      const [account, options] = await getFromAcct(currentAccount);
      const txChangeContractOwnerExecute =
        api?.tx.palletWhitelist.enableWhitelist(
          poolId,
          `${config.WHITELIST_DEFAULT_URL}/whitelist/verify`
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

  return { mutationEnableWhitelist, isLoading };
};

export default useEnableWhitelist;
