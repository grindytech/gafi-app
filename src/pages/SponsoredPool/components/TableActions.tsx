import { Button, useToast } from '@chakra-ui/react';
import { GafiPrimitivesTicketTicketInfo } from '@polkadot/types/lookup';
import { ISubmittableResult } from '@polkadot/types/types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';

import { getFromAcct, handleTxError } from 'components/utils';
import { useSubstrateState } from 'contexts/substrateContext';

interface IProps {
  poolId: string;
}

const TableActions: React.FC<IProps> = ({ poolId }) => {
  const { t } = useTranslation();
  const { api, currentAccount } = useSubstrateState();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const txCallback = ({ status, events }: ISubmittableResult) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        title: t('FINALIZED_BLOCK_HASH'),
        description: status.asFinalized.toString(),
        isClosable: true,
        status: 'success',
      });
      refetch();
      setIsLoading(false);
    } else {
      toast({
        title: t('CURRENT_TRANSACTION_STATUS'),
        description: status.type,
        isClosable: true,
        status: 'info',
      });
    }
  };

  const { data: joinedPoolInfo, refetch } = useQuery(
    ['getJoinedPool', currentAccount],
    async (): Promise<GafiPrimitivesTicketTicketInfo | undefined> => {
      if (api && currentAccount?.address) {
        const res = await api.query.pool.tickets(currentAccount?.address);
        if (res.isSome) {
          return res.unwrap();
        }
        return undefined;
      }
    },
    {
      enabled: !!currentAccount,
    }
  );

  const isJoinedPool = !!joinedPoolInfo?.ticketType.toHuman();

  const mutation = useMutation(
    async (actionType: 'join' | 'leave') => {
      const [account, options] = await getFromAcct(currentAccount);
      let txExecute;
      if (actionType === 'join') {
        txExecute = api?.tx.pool.join({ Custom: { Sponsored: poolId } });
      } else {
        txExecute = api?.tx.pool.leave();
      }
      if (options) {
        return txExecute?.signAndSend(account, options, txCallback) as Promise<
          () => void
        >;
      }
      return txExecute?.signAndSend(account, txCallback) as Promise<() => void>;
    },
    {
      mutationKey: 'join-leave-pool',
      onError: (error: any) => {
        toast({
          description: t('TRANSACTION_FAILED', {
            errorMessage: error.toString(),
          }),
          isClosable: true,
          status: 'error',
        });
        setIsLoading(false);
      },
    }
  );

  const onJoinPool = async () => {
    setIsLoading(true);
    mutation.mutate('join');
  };

  const onLeavePool = async () => {
    setIsLoading(true);
    mutation.mutate('leave');
  };

  return (
    <>
      {joinedPoolInfo?.ticketType.isCustom &&
      joinedPoolInfo?.ticketType.asCustom.asSponsored.toHuman() === poolId ? (
        <Button
          size="sm"
          sx={{
            px: 8,
          }}
          variant="solid"
          onClick={e => {
            e.stopPropagation();
            onLeavePool();
          }}
          isLoading={isLoading}
        >
          {t('LEAVE')}
        </Button>
      ) : (
        <Button
          size="sm"
          sx={{
            px: 8,
          }}
          variant="outline"
          onClick={e => {
            e.stopPropagation();
            onJoinPool();
          }}
          disabled={isJoinedPool}
          isLoading={isLoading}
        >
          {t('JOIN')}
        </Button>
      )}
    </>
  );
};

export default TableActions;
