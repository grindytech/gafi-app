import { useToast } from '@chakra-ui/react';
import { PalletNftsAttributeNamespace } from '@polkadot/types/lookup';
import { useSubstrateState } from 'contexts/substrateContext';
import useTxCallback from 'hooks/useTxCallback';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { getFromAcct } from 'utils';

export default function useClearAttribute(
  onSuccess: () => void,
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>
) {
  const toast = useToast();
  const { t } = useTranslation();
  const { api, currentAccount } = useSubstrateState();
  const [isLoading, setIsLoading] = useState(false);

  const refetchData = () => {
    onSuccess();
  };

  const refetchLoad = (type: boolean) => {
    if (type === false) {
      setIsLoading(false);
      setIsPending(false);
    }
    if (type === true) {
      setIsLoading(true);
      setIsPending(true);
    }
  };

  const onFinalize = () => {
    refetchLoad(false);
  };

  const txCallback = useTxCallback(refetchData, onFinalize);
  const mutation = useMutation(
    async (params: {
      collection: number;
      mayBeItem: number | null;
      namespace: PalletNftsAttributeNamespace;
      key: string;
    }) => {
      if (!currentAccount) {
        return;
      }
      const [account, options] = await getFromAcct(currentAccount);
      const txExecute = api?.tx.game.clearAttribute(
        params.collection,
        params.mayBeItem,
        params.namespace,
        params.key
      );
      return txExecute?.signAndSend(account, options || {}, txCallback);
    },
    {
      mutationKey: 'game-clear-attribute',
      onError: (error: Error) => {
        toast({
          position: 'top-right',
          description: t('TRANSACTION_FAILED', {
            errorMessage: error?.message,
          }),
          isClosable: true,
          status: 'error',
        });
        refetchLoad(false);
      },
    }
  );
  const clearAttribute = (
    collection: number,
    mayBeItem: number | null,
    namespace: PalletNftsAttributeNamespace,
    key: string
  ) => {
    refetchLoad(true);

    mutation.mutate({ collection, mayBeItem, namespace, key });
  };
  return { isLoading, clearAttribute };
}
