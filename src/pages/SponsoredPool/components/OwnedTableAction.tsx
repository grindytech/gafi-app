import React from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { getFromAcct, handleTxError } from 'components/utils';
import { useSubstrateState } from 'substrate-lib';
import { t } from 'i18next';
import { useState } from 'react';
import { SponsoredPool } from 'graphQL/generates';
import { ISubmittableResult } from '@polkadot/types/types';
import ModalEditPool from './ModalEditPool';

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
        description: `😉 Finalized. Block hash: ${status.asFinalized.toString()}`,
        isClosable: true,
        status: 'success',
      });
      setIsLoading(false);
    } else {
      toast({
        description: `Current transaction status: ${status.type}`,
        isClosable: true,
        status: 'info',
      });
    }
  };

  const onWithdraw = async () => {
    setIsLoading(true);
    const [account, options] = await getFromAcct(currentAccount);
    if (api && account) {
      const txExecute = api.tx.sponsoredPool.withdrawPool(poolId);
      if (options) {
        try {
          await txExecute.signAndSend(account, options, txCallback);
        } catch (err: any) {
          toast({
            description: `😞 Transaction Failed: ${err.toString()}`,
            isClosable: true,
            status: 'error',
          });
          setIsLoading(false);
        }
      } else {
        try {
          await txExecute.signAndSend(account, txCallback);
        } catch (err: any) {
          toast({
            description: `😞 Transaction Failed: ${err.toString()}`,
            isClosable: true,
            status: 'error',
          });
          setIsLoading(false);
        }
      }
    }
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
