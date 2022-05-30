import { Button, useToast } from '@chakra-ui/react';
import { GafiPrimitivesPlayerTicketInfo } from '@polkadot/types/lookup';
import { ISubmittableResult } from '@polkadot/types/types';
import { getFromAcct, handleTxError } from 'components/utils';
import { SponsoredPool } from 'gafi-dashboard/graphQL/generates';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import { useSubstrateState } from 'substrate-lib';
import { useQueryParam } from 'use-query-params';
import ModalEditPool from './ModalEditPool';

interface IProps {
  pool: SponsoredPool;
}

const TableActions: React.FC<IProps> = ({ pool }) => {
  const { poolId } = pool;
  const { t } = useTranslation();
  const { api, currentAccount } = useSubstrateState();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const txCallback = ({ status, events }: ISubmittableResult) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        description: t('FINALIZED_BLOCK_HASH', {
          hash: status.asFinalized.toString(),
        }),
        isClosable: true,
        status: 'success',
      });
      refetch();
      setIsLoading(false);
    } else {
      toast({
        description: t('CURRENT_TRANSACTION_STATUS', {
          statusType: status.type,
        }),
        isClosable: true,
        status: 'info',
      });
    }
  };

  const { data: joinedPoolInfo, refetch } = useQuery(
    ['getJoinedStakingPool', currentAccount],
    async (): Promise<GafiPrimitivesPlayerTicketInfo | undefined> => {
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
        txExecute = api?.tx.pool.join({ Sponsored: poolId });
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
      {joinedPoolInfo?.ticketType.isSponsored &&
      joinedPoolInfo?.ticketType.asSponsored.toHuman() === poolId ? (
        <Button
          color="red.300"
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
          color="primary"
          variant="solid"
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
