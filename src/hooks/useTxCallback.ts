import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useSubstrateState } from 'contexts/substrateContext';
import { getInjectedWeb3 } from 'utils/utils';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { ISubmittableResult } from '@polkadot/types/types';
import useTxError from './useTxError';
import { useState } from 'react';

interface useTxCallBackProps {
  address: string;
  submit: SubmittableExtrinsic<'promise', ISubmittableResult> | undefined;
  key: string[];
  onSuccess?: () => void;
}

export default function useTxCallBack({
  submit,
  address,
  key,
  onSuccess,
}: useTxCallBackProps) {
  const toast = useToast();
  const { api } = useSubstrateState();
  const [isLoading, setIsLoading] = useState(false);

  const { txError } = useTxError({
    onSuccess() {
      setIsLoading(false);

      if (onSuccess) {
        onSuccess();
      }
    },
  });

  const mutation = useMutation({
    mutationKey: key,
    mutationFn: async () => {
      const injected = await getInjectedWeb3();
      setIsLoading(true);

      if (submit && api && injected) {
        await submit.signAndSend(address, { signer: injected.signer }, txError);
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

  return {
    isLoading,
    setIsLoading,
    mutation,
  };
}
