import React from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { getFromAcct, handleTxError } from 'components/utils';
import { useSubstrateState } from 'substrate-lib';
import { t } from 'i18next';
import { useState } from 'react';
import { SponsoredPool } from 'graphQL/generates';
import { ISubmittableResult } from '@polkadot/types/types';
import ModalEditPool from './ModalEditPool';
import { useMutation } from 'react-query';

interface IProps {
  pool: SponsoredPool;
}

const OwnedTableAction: React.FC<IProps> = ({ pool }) => {
  const { poolId } = pool;
  const [isOpenEditPoolModal, setIsOpenEditPoolModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { api, currentAccount } = useSubstrateState();
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

  const mutation = useMutation(
    async () => {
      const [account, options] = await getFromAcct(currentAccount);

      const txExecute = api?.tx.sponsoredPool.withdrawPool(poolId);
      if (options) {
        return txExecute?.signAndSend(account, options, txCallback);
      }
      return txExecute?.signAndSend(account, txCallback);
    },
    {
      mutationKey: 'withdraw-pool',
      onError: (err: any) => {
        toast({
          description: t('TRANSACTION_FAILED', {
            errorMessage: err.toString(),
          }),
          isClosable: true,
          status: 'error',
        });
        setIsLoading(false);
      },
    }
  );

  const onWithdraw = async () => {
    setIsLoading(true);
    mutation.mutate();
  };
  return (
    <>
      <Button
        onClick={() => {
          setIsOpenEditPoolModal(true);
        }}
        color="primary"
        variant="solid"
      >
        {t('EDIT')}
      </Button>
      <Button
        onClick={() => {
          onWithdraw();
        }}
        ml={3}
        color="red.300"
        variant="solid"
        isLoading={isLoading}
      >
        {t('WITHDRAW')}
      </Button>
      <ModalEditPool
        pool={pool}
        isOpen={isOpenEditPoolModal}
        onClose={() => {
          setIsOpenEditPoolModal(false);
        }}
      />
    </>
  );
};

export default OwnedTableAction;
