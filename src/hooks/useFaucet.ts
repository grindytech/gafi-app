import { useMediaQuery, useToast } from '@chakra-ui/react';
import { ISubmittableResult } from '@polkadot/types/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSubstrate } from 'contexts/substrateContext';
import { getFromAcct, handleTxError } from 'utils';

const useFaucet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    state: { currentAccount, api },
  } = useSubstrate();
  const toast = useToast();
  const { t } = useTranslation();
  const [isMobile] = useMediaQuery('(max-width: 739px)');

  const txResHandler = ({ status, events }: ISubmittableResult) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        position: 'top-right',
        title: t('FINALIZED_BLOCK_HASH'),
        description: status.asFinalized.toString(),
        isClosable: true,
        status: 'success',
      });
      setIsLoading(false);
    } else {
      toast({
        position: 'top-right',
        title: t('CURRENT_TRANSACTION_STATUS'),
        description: status.type,
        isClosable: true,
        status: 'info',
      });
    }
  };

  const txErrHandler = (err: any) => {
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
          .signAndSend(acc, options || {}, txResHandler)
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
