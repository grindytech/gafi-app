import { useToast } from '@chakra-ui/react';
import { ISubmittableResult } from '@polkadot/types/types';
import { useTranslation } from 'react-i18next';

import { useSubstrateState } from 'contexts/substrateContext';
import { handleTxError } from 'utils';

export default function useTxCallback(
  onSuccess: () => void,
  onFinalize?: () => void,
  success?: string
) {
  const { api } = useSubstrateState();

  const { t } = useTranslation();

  const toast = useToast({
    position: 'top-right',
    isClosable: true,
  });

  const txCallback = ({ status, events }: ISubmittableResult) => {
    if (status.isFinalized) {
      toast({
        title: t(success ?? 'FINALIZED_BLOCK_HASH'),
        description: status.asFinalized.toString(),
        status: 'success',
      });

      const hasError = handleTxError(events, api, toast);

      if (!hasError) {
        onSuccess();
      }

      if (onFinalize) {
        onFinalize();
      }
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
