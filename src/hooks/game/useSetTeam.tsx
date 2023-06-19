import { useToast } from '@chakra-ui/react';
import { useSubstrateState } from 'contexts/substrateContext';
import useTxCallback from 'hooks/useTxCallback';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { getFromAcct } from 'utils';

export default function useSetTeam(
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
      issuer: string | null;
      admin: string | null;
      freezer: string | null;
    }) => {
      if (!currentAccount) {
        return;
      }
      const [account, options] = await getFromAcct(currentAccount);
      const txExecute = api?.tx.game.setTeam(
        params.collection,
        params.issuer,
        params.admin,
        params.freezer
      );
      return txExecute?.signAndSend(account, options || {}, txCallback);
    },
    {
      mutationKey: 'game-set-team',
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
  const setTeam = (
    collection: number,
    issuer: string | null,
    admin: string | null,
    freezer: string | null
  ) => {
    refetchLoad(true);

    mutation.mutate({ collection, issuer, admin, freezer });
  };
  return { isLoading, setTeam };
}
