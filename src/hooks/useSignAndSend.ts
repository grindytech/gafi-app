import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { getInjectedWeb3 } from 'utils/utils';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { ISubmittableResult } from '@polkadot/types/types';
import useTxError from './useTxError';
import { useState } from 'react';
import { GAFI_WALLET_STORAGE_KEY } from 'utils/constants';

interface useSignAndSendProps {
  address: string;
  key: string[];
  onSuccess?: () => void;
  onError?: () => void;
}

export default function useSignAndSend({
  address,
  key,
  onSuccess,
  onError,
}: useSignAndSendProps) {
  const extensionName = localStorage.getItem(GAFI_WALLET_STORAGE_KEY);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { txError } = useTxError({
    onSuccess() {
      setIsLoading(false);

      if (onSuccess) {
        onSuccess();
      }
    },
    onError() {
      setIsLoading(false);

      if (onError) {
        onError();
      }
    },
  });

  const getMutation = useMutation({
    mutationKey: key,
    mutationFn: async (
      parmas: SubmittableExtrinsic<'promise', ISubmittableResult>
    ) => {
      setIsLoading(true);

      const injected = await getInjectedWeb3(extensionName as string);

      if (injected) {
        await parmas.signAndSend(
          address,
          {
            signer: injected.signer,
          },
          txError
        );
      }
    },
    onError: (error: Error) => {
      toast({
        position: 'top-right',
        status: 'error',
        description: error.message,
        isClosable: true,
      });

      setIsLoading(false);
    },
  });

  const mutation = (submit: any) => {
    getMutation.mutate(submit);
  };

  return {
    isLoading,
    setIsLoading,
    mutation,
  };
}
