import { useToast } from '@chakra-ui/react';
import { GafiSupportGameTypesTradeType } from '@polkadot/types/lookup';
import { useSubstrateState } from 'contexts/substrateContext';
import useTxCallback from 'hooks/useTxCallback';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { getFromAcct } from 'utils';

export default function useCancelTrade(
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
      trade: number;
      tradeType: GafiSupportGameTypesTradeType;
    }) => {
      if (!currentAccount) {
        return;
      }
      const [account, options] = await getFromAcct(currentAccount);
      const txExecute = api?.tx.game.cancelTrade(
        params.trade,
        params.tradeType
      );
      return txExecute?.signAndSend(account, options || {}, txCallback);
    },
    {
      mutationKey: 'game-cancel-trade',
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
  const cancelTrade = (
    trade: number,
    tradeType: GafiSupportGameTypesTradeType
  ) => {
    refetchLoad(true);

    mutation.mutate({ trade, tradeType });
  };
  return { isLoading, cancelTrade };
}
