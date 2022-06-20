import { useToast } from '@chakra-ui/react';
import { ISubmittableResult } from '@polkadot/types/types';
import { ethers } from 'ethers';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { getFromAcct, handleTxError } from 'components/utils';
import { IEditPoolNameForm } from 'pages/SponsoredPool/components/EditPoolNameForm';
import {
  IEditTargetsForm,
  ITargets,
} from 'pages/SponsoredPool/components/EditTargetsForm';
import { SponsoredPoolForm } from 'pages/SponsoredPool/components/ModalAddSponsoredPool';
import { useSubstrateState } from 'substrate-lib';

const useEditPool = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const { api, currentAccount, chainDecimal } = useSubstrateState();
  const toast = useToast();
  const { t } = useTranslation();
  const { parseUnits } = ethers.utils;

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
      setIsDone(true);
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

  const poolTargetsMutation = useMutation(
    async (params: { targetsData: ITargets; poolId: string }) => {
      const [account, options] = await getFromAcct(currentAccount);
      const newTargets = params.targetsData.map(
        target => target.contractAddress
      );
      const txSetNewTargets = api?.tx.sponsoredPool.newTargets(
        params.poolId,
        newTargets
      );
      if (options) {
        return txSetNewTargets?.signAndSend(
          account,
          options,
          txCallback
        ) as Promise<() => void>;
      }
      return txSetNewTargets?.signAndSend(account, txCallback) as Promise<
        () => void
      >;
    },
    {
      mutationKey: 'update-target-contract',
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

  const poolNameMutation = useMutation(
    async (params: { poolName: string; poolId: string }) => {
      const [account, options] = await getFromAcct(currentAccount);
      const txSetPoolNameExecute = api?.tx.sponsoredPool.setPoolName(
        params.poolId,
        params.poolName
      );
      if (options) {
        return txSetPoolNameExecute?.signAndSend(
          account,
          options,
          txCallback
        ) as Promise<() => void>;
      }
      return txSetPoolNameExecute?.signAndSend(account, txCallback) as Promise<
        () => void
      >;
    },
    {
      mutationKey: 'update-pool-name',
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

  const createPoolMutation = useMutation(
    async (data: SponsoredPoolForm) => {
      const [account, options] = await getFromAcct(currentAccount);
      const targets = data.targets.map(target => target.contractAddress);
      const txExecute = api?.tx.sponsoredPool.createPool(
        targets,
        parseUnits(data.poolAmount.toString(), chainDecimal).toString(),
        parseFloat(data.discount) * 10000,
        data.txLimit
      );
      if (options)
        return txExecute?.signAndSend(account, options, txCallback) as Promise<
          () => void
        >;
      return txExecute?.signAndSend(account, txCallback) as Promise<() => void>;
    },
    {
      mutationKey: 'create-pool',
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

  return {
    editPoolTargets: (data: IEditTargetsForm, poolId: string) => {
      setIsDone(false);
      setIsLoading(true);
      poolTargetsMutation.mutate({ targetsData: data.targets, poolId });
    },
    editPoolName: (data: IEditPoolNameForm, poolId: string) => {
      setIsDone(false);
      setIsLoading(true);
      poolNameMutation.mutate({ poolName: data.poolName, poolId });
    },
    createPool: (data: SponsoredPoolForm) => {
      setIsDone(false);
      setIsLoading(true);
      createPoolMutation.mutate(data);
    },
    isLoading,
    isDone,
  };
};

export default useEditPool;
