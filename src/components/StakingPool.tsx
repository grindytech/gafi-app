import { Box, Button, HStack, Text, useToast, VStack } from '@chakra-ui/react';
import { GafiPrimitivesPoolTicket } from '@polkadot/types/lookup';
import { ISubmittableResult } from '@polkadot/types/types';
import { formatBalance } from '@polkadot/util';
import { PoolInfo } from 'gafi-dashboard/interfaces';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useSubstrateState } from '../substrate-lib';
import Card from './card/Card';
import { TicketType } from './UpfrontPool';
import { getFromAcct, handleTxError } from './utils';

interface PoolTicketInfo {
  address: string;
  joinTime: string;
  ticketType: TicketType;
}
const StakingPool = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const { api, currentAccount, chainDecimal } = useSubstrateState();
  const [selectedPool, setSelectedPool] = useState('');

  const { data: joinedPoolInfo, refetch } = useQuery(
    ['getJoinedStakingPool', currentAccount],
    async (): Promise<GafiPrimitivesPoolTicket | undefined> => {
      if (api) {
        const res = await api.query.stakingPool.tickets(
          currentAccount.address as string
        );
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

  const { data: poolInfo } = useQuery(
    'getStakingPoolInfo',
    async (): Promise<PoolInfo | undefined> => {
      if (api) {
        const basic = await api.query.stakingPool.services('Basic');
        const medium = await api.query.stakingPool.services('Medium');
        const advance = await api.query.stakingPool.services('Advance');
        return {
          basic: basic.unwrap(),
          medium: medium.unwrap(),
          advance: advance.unwrap(),
        };
      }
    }
  );

  const txCallback = ({ status, events }: ISubmittableResult) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        description: `😉 Finalized. Block hash: ${status.asFinalized.toString()}`,
        isClosable: true,
        status: 'success',
      });
      refetch();
      setSelectedPool('');
    } else {
      toast({
        description: `Current transaction status: ${status.type}`,
        isClosable: true,
        status: 'info',
      });
    }
  };

  const onJoinPool = async (poolPackage: string) => {
    setSelectedPool(poolPackage);
    const [account, options] = await getFromAcct(currentAccount);
    if (api && account) {
      const txExecute = api.tx.pool.join({ Staking: poolPackage });
      if (options) {
        try {
          await txExecute.signAndSend(account, options, txCallback);
        } catch (err: any) {
          toast({
            description: `😞 Transaction Failed: ${err.toString()}`,
            isClosable: true,
            status: 'error',
          });
          setSelectedPool('');
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
          setSelectedPool('');
        }
      }
    }
  };

  const onLeavePool = async () => {
    const [account, options] = await getFromAcct(currentAccount);
    if (api && account) {
      const txExecute = api.tx.pool.leave();
      if (options) {
        try {
          await txExecute.signAndSend(account, options, txCallback);
        } catch (err: any) {
          toast({
            description: `😞 Transaction Failed: ${err.toString()}`,
            isClosable: true,
            status: 'error',
          });
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
        }
      }
    }
  };

  return (
    <Box pt={{ base: '120px', md: '75px' }}>
      <Text fontWeight="bold" fontSize="2xl" mb={5}>
      {t("POOL.STACKING_POOL")}
      </Text>
      {joinedPoolInfo && (
        <VStack>
          <Text>
            Joined pool type: {joinedPoolInfo.ticketType.asStaking.type}
          </Text>
          <Text>
            Time: {new Date(Number(joinedPoolInfo.joinTime)).toLocaleString()}
          </Text>
        </VStack>
      )}
      <HStack p={5} gap={5}>
        <Card>
          <Text textAlign="center" fontWeight="bold" mb={5}>
            {t("POOL_TYPE.BASIC")}
          </Text>
          <VStack>
            {poolInfo?.basic?.service.txLimit && (
              <Text>
                {t('TRANSACTIONS_PER_MINUTE', {
                  transactionAmount: poolInfo.basic.service.txLimit.toNumber(),
                })}
              </Text>
            )}
            {poolInfo?.basic?.service.discount && (
              <Text>
                {t('DISCOUNT_FEE', {
                  discountPercent: poolInfo.basic.service.discount.toNumber(),
                })}
              </Text>
            )}
            {poolInfo?.basic.value && (
              <Text>
                {t('POOL_FEE', {
                  poolFee: formatBalance(
                    poolInfo?.basic.value.toString(),
                    { withSi: true, forceUnit: '-', withUnit: 'GAKI' },
                    chainDecimal
                  ),
                })}
              </Text>
            )}

            {joinedPoolInfo?.ticketType.asStaking.type === 'Basic' ? (
              <Button variant="solid" color="red.300" onClick={onLeavePool}>
                Leave
              </Button>
            ) : (
              <Button
                color="primary"
                variant="solid"
                onClick={() => onJoinPool('Basic')}
                isLoading={selectedPool === 'Basic'}
              >
                Join
              </Button>
            )}
          </VStack>
        </Card>
        <Card>
          <Text textAlign="center" fontWeight="bold" mb={5}>
            {t("POOL_TYPE.MEDIUM")}
          </Text>
          <VStack>
            {poolInfo?.medium?.service.txLimit && (
              <Text>
                {t('TRANSACTIONS_PER_MINUTE', {
                  transactionAmount: poolInfo.medium.service.txLimit.toNumber(),
                })}
              </Text>
            )}
            {poolInfo?.medium?.service.discount && (
              <Text>
                {t('DISCOUNT_FEE', {
                  discountPercent: poolInfo.basic.service.discount.toNumber(),
                })}
              </Text>
            )}
            {poolInfo?.medium.value && (
              <Text>
                {t('POOL_FEE', {
                  poolFee: formatBalance(
                    poolInfo?.medium.value.toString(),
                    { withSi: true, forceUnit: '-', withUnit: 'GAKI' },
                    chainDecimal
                  ),
                })}
              </Text>
            )}

            {joinedPoolInfo?.ticketType.asStaking.isMedium ? (
              <Button variant="solid" color="red.300" onClick={onLeavePool}>
                Leave
              </Button>
            ) : (
              <Button
                color="primary"
                variant="solid"
                onClick={() => onJoinPool('Medium')}
                isLoading={selectedPool === 'Medium'}
              >
                Join
              </Button>
            )}
          </VStack>
        </Card>
        <Card>
          <Text textAlign="center" fontWeight="bold" mb={5}>
            {t("POOL_TYPE.ADVANCE")}
          </Text>
          <VStack>
            {poolInfo?.advance?.service.txLimit && (
              <Text>
                {t('TRANSACTIONS_PER_MINUTE', {
                  transactionAmount:
                    poolInfo.advance.service.txLimit.toNumber(),
                })}
              </Text>
            )}
            {poolInfo?.advance?.service.discount && (
              <Text>
                {t('DISCOUNT_FEE', {
                  discountPercent: poolInfo.basic.service.discount.toNumber(),
                })}
              </Text>
            )}
            {poolInfo?.advance.value && (
              <Text>
                {t('POOL_FEE', {
                  poolFee: formatBalance(
                    poolInfo?.advance.value.toString(),
                    { withSi: true, forceUnit: '-', withUnit: 'GAKI' },
                    chainDecimal
                  ),
                })}
              </Text>
            )}

            {joinedPoolInfo?.ticketType.asStaking.isAdvance ? (
              <Button variant="solid" color="red.300" onClick={onLeavePool}>
                Leave
              </Button>
            ) : (
              <Button
                color="primary"
                variant="solid"
                onClick={() => onJoinPool('Advance')}
                isLoading={selectedPool === 'Advance'}
              >
                Join
              </Button>
            )}
          </VStack>
        </Card>
      </HStack>
    </Box>
  );
};

export default StakingPool;
