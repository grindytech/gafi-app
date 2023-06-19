import { useToast } from '@chakra-ui/react';
import { PalletNftsItemConfig } from '@polkadot/types/lookup';
import { useSubstrateState } from 'contexts/substrateContext';
import useTxCallback from 'hooks/useTxCallback';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { getFromAcct } from 'utils';

export default function useCreateItem(
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
      item: number;
      setting: PalletNftsItemConfig;
      maybeSupply: number | null;
    }) => {
      if (!currentAccount) {
        return;
      }
      const [account, options] = await getFromAcct(currentAccount);
      const txExecute = api?.tx.game.createItem(
        params.collection,
        params.item,
        params.setting,
        params.maybeSupply
      );
      return txExecute?.signAndSend(account, options || {}, txCallback);
    },
    {
      mutationKey: 'game-create-item',
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

  const createItem = (
    collection: number,
    item: number,
    setting: PalletNftsItemConfig,
    maybeSupply: number | null
  ) => {
    refetchLoad(true);

    mutation.mutate({ collection, item, setting, maybeSupply });
  };

  return {
    createItem,
    isLoading,
  };
}
