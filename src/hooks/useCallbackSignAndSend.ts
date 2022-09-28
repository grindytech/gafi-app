import { useToast } from '@chakra-ui/react';
import { ISubmittableResult } from '@polkadot/types/types';
import { useTranslation } from 'react-i18next';

import { useSubstrateState } from 'contexts/substrateContext';
import { handleTxError } from 'utils';

export default function useSignAndSend(onSuccess: () => void) {
  const { t } = useTranslation();

  const toast = useToast({ position: 'top-right', isClosable: true });

  const { api } = useSubstrateState();

  const txCallback = ({ status, events }: ISubmittableResult) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        title: t('FINALIZED_BLOCK_HASH'),
        description: status.asFinalized.toString(),
        status: 'success',
      });
      onSuccess();
    } else {
      toast({
        title: t('CURRENT_TRANSACTION_STATUS'),
        description: status.type,
        status: 'info',
      });
    }
  };

  return txCallback;
}
