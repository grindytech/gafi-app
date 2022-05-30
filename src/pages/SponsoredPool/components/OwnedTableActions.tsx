import React from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { getFromAcct, handleTxError } from 'components/utils';
import { useSubstrateState } from 'substrate-lib';
import { useState } from 'react';
import { SponsoredPool } from 'graphQL/generates';
import { ISubmittableResult } from '@polkadot/types/types';
import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';

interface IProps {
  poolId: string;
  onClick: () => void;
}

const OwnedTableActions: React.FC<IProps> = ({ poolId, onClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { api, currentAccount } = useSubstrateState();
  const toast = useToast();
  const { t } = useTranslation();

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
        onClick={e => {
          e.stopPropagation();
          onClick();
        }}
        color="primary"
        variant="solid"
      >
        {t('EDIT')}
      </Button>
      <Button
        onClick={e => {
          e.stopPropagation();
          onWithdraw();
        }}
        ml={3}
        color="red.300"
        variant="solid"
        isLoading={isLoading}
      >
        {t('WITHDRAW')}
      </Button>
    </>
  );
};

export default OwnedTableActions;
