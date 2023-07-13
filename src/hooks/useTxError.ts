import { useToast } from '@chakra-ui/react';
import { EventRecord } from '@polkadot/types/interfaces';
import { ISubmittableResult } from '@polkadot/types/types';
import { useAppSelector } from './useRedux';

interface useTxErrorProps {
  onSuccess?: () => void;
}

export default function useTxError({ onSuccess }: useTxErrorProps) {
  const toast = useToast();
  const { api } = useAppSelector(state => state.substrate);

  const txError = (result: ISubmittableResult) => {
    const { status, events } = result;

    let isError = false;

    events.forEach(({ event }: EventRecord) => {
      if (api && api.events.system.ExtrinsicFailed.is(event)) {
        isError = true;
        // extract the data for this event
        const [dispatchError] = event.data;
        let errorInfo;

        // decode the error
        if (dispatchError.isModule) {
          // for module errors, we have the section indexed, lookup
          // (For specific known errors, we can also do a check against the
          // api.errors.<module>.<ErrorName>.is(dispatchError.asModule) guard)
          const decoded = api.registry.findMetaError(dispatchError.asModule);

          errorInfo = `${decoded.name}`;
        } else {
          // Other, CannotLookup, BadOrigin, no extra info
          errorInfo = dispatchError.toString();
        }

        toast({
          position: 'top-right',
          status: 'error',
          description: errorInfo,
        });

        if (onSuccess) {
          onSuccess();
        }
      }
    });

    toast({
      position: 'top-right',
      status: 'success',
      title: status.type,
      description: status.type,
    });

    if (status.isFinalized && isError === false) {
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  return {
    txError,
  };
}
