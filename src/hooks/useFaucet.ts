import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useTxCallback from './useTxCallback';

import { useSubstrate } from 'contexts/substrateContext';
import { getFromAcct } from 'utils';

const useFaucet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    state: { currentAccount, api },
  } = useSubstrate();
  const toast = useToast();
  const { t } = useTranslation();

  const txCallback = useTxCallback(() => setIsLoading(false));

  const txErrHandler = (err: Error) => {
    toast({
      position: 'top-right',
      description: t('TRANSACTION_FAILED', {
        errorMessage: err.toString(),
      }),
      isClosable: true,
      status: 'error',
    });
    setIsLoading(false);
  };

  const onFaucet = async () => {
    setIsLoading(true);
    if (currentAccount) {
      const [acc, options] = await getFromAcct(currentAccount);

      if (api) {
        const txExecute = api.tx.faucet.faucet();
        await txExecute
          .signAndSend(acc, options || {}, txCallback)
          .catch(txErrHandler);
      }
    }
  };

  return {
    faucet: onFaucet,
    isLoading,
  };
};

export default useFaucet;
