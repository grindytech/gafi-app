import { useToast } from '@chakra-ui/react';
import { ISubmittableResult } from '@polkadot/types/types';
import { useTranslation } from 'react-i18next';

import { useSubstrateState } from 'contexts/substrateContext';
import { handleTxError } from 'utils';

export default function useTxCallback(onSucess: () => void, sucess?: string) {
  const { api } = useSubstrateState();

  const { t } = useTranslation();

  const toast = useToast({
    position: 'top-right',
    isClosable: true,
  });

  const txCallback = ({ status, events }: ISubmittableResult) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        title: t(sucess ?? 'FINALIZED_BLOCK_HASH'),
        description: status.asFinalized.toString(),
        status: 'success',
      });
      onSucess();
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
