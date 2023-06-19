import { useToast } from '@chakra-ui/react';
import { useSubstrateState } from 'contexts/substrateContext';
import useTxCallback from 'hooks/useTxCallback';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { getFromAcct } from 'utils';

export default function useBidAuction(
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
    async (params: { trade: number; bid: string }) => {
      if (!currentAccount) {
        return;
      }
      const [account, options] = await getFromAcct(currentAccount);
      const txExecute = api?.tx.game.bidAuction(params.trade, params.bid);
      return txExecute?.signAndSend(account, options || {}, txCallback);
    },
    {
      mutationKey: 'game-bid-auction',
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
  const bidAuction = (trade: number, bid: string) => {
    refetchLoad(true);

    mutation.mutate({ trade, bid });
  };
  return { isLoading, bidAuction };
}
