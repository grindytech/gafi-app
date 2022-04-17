import { Box, HStack, Text, useToast, VStack, Button } from '@chakra-ui/react';
import { Balance } from '@polkadot/types/interfaces';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { useSubstrateState } from '../substrate-lib';

import Card from './card/Card';
import CardHeader from './card/CardHeader';
import { getFromAcct } from './utils';

interface PoolTicketInfo {
  address: string;
  joinTime: string;
  ticketType: string;
}

interface PoolInfo {
  basic: {
    txLimit: number;
    discount: number;
    service: number;
  };
  medium: {
    txLimit: number;
    discount: number;
    service: number;
  };
  max: {
    txLimit: number;
    discount: number;
    service: number;
  };
}

const StakingPool = () => {
  const toast = useToast();
  const { api, currentAccount } = useSubstrateState();
  const [selectedPool, setSelectedPool] = useState('');

  const { data: joinedPoolInfo, refetch } = useQuery(
    ['getJoinedStakingPool', currentAccount],
    async (): Promise<PoolTicketInfo> => {
      const res = await api.query.stakingPool.tickets(currentAccount.address);
      return res.toJSON();
    },
    {
      enabled: !!currentAccount,
    }
  );

  const { data: poolInfo } = useQuery(
    'getStackingPoolInfo',
    async (): Promise<PoolInfo> => {
      const basic = await api.query.stakingPool.services('Basic');
      const medium = await api.query.stakingPool.services('Medium');
      const max = await api.query.stakingPool.services('Advance');
      return {
        basic: {
          ...basic.toJSON(),
          service: basic.get('value').toString(),
        },
        medium: {
          ...medium.toJSON(),
          service: medium.get('value').toString(),
        },
        max: {
          ...max.toJSON(),
          service: max.get('value').toString(),
        },
      };
    }
  );

  const onJoinPool = async (poolPackage: string) => {
    setSelectedPool(poolPackage);
    const fromAcct = await getFromAcct(currentAccount);
    const txExecute = api.tx.optionPool.join(poolPackage);
    try {
      await txExecute
        // Temporary using any. Define type later.
        .signAndSend(...fromAcct, ({ status }: any) => {
          if (status.isFinalized) {
            toast({
              description: `😉 Finalized. Block hash: ${status.asFinalized.toString()}`,
              isClosable: true,
              status: 'success',
              position: 'top-right',
            });
            refetch();
            setSelectedPool('');
          } else {
            toast({
              description: `Current transaction status: ${status.type}`,
              isClosable: true,
              status: 'info',
              position: 'top-right',
            });
          }
        });
    } catch (err: any) {
      toast({
        description: `😞 Transaction Failed: ${err.toString()}`,
        isClosable: true,
        status: 'error',
        position: 'top-right',
      });
      setSelectedPool('');
    }
  };

  const onLeavePool = async () => {
    const fromAcct = await getFromAcct(currentAccount);
    const txExecute = api.tx.optionPool.leave();
    try {
      await txExecute
        // Temporary using any. Define type later.
        .signAndSend(...fromAcct, ({ status }: any) => {
          if (status.isFinalized) {
            toast({
              description: `😉 Finalized. Block hash: ${status.asFinalized.toString()}`,
              isClosable: true,
              status: 'success',
            });
            refetch();
          } else {
            toast({
              description: `Current transaction status: ${status.type}`,
              isClosable: true,
              status: 'info',
            });
          }
        });
    } catch (err: any) {
      toast({
        description: `😞 Transaction Failed: ${err.toString()}`,
        isClosable: true,
        status: 'error',
      });
    } finally {
    }
  };

  return (
    <Box pt={{ base: '120px', md: '75px' }}>
      <Text fontWeight="bold" fontSize="2xl" mb={5}>
        Staking Pool
      </Text>
      {joinedPoolInfo && (
        <VStack>
          <Text>Joined pool type: {joinedPoolInfo.ticketType}</Text>
          <Text>
            Time: {new Date(Number(joinedPoolInfo.joinTime)).toLocaleString()}
          </Text>
        </VStack>
      )}
      <HStack p={5} gap={5}>
        <Card>
          <Text textAlign="center" fontWeight="bold" mb={5}>
            Basic
          </Text>
          <VStack>
            {poolInfo?.basic?.txLimit && (
              <Text>Transactions per minute: {poolInfo.basic.txLimit}</Text>
            )}
            {poolInfo?.basic?.discount && (
              <Text>Discount fee: {poolInfo.basic.discount} %</Text>
            )}

            {joinedPoolInfo?.ticketType === 'Basic' ? (
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
            Medium
          </Text>
          <VStack>
            {poolInfo?.medium?.txLimit && (
              <Text>Transactions per minute: {poolInfo.medium.txLimit}</Text>
            )}
            {poolInfo?.medium?.discount && (
              <Text>Discount fee: {poolInfo.medium.discount} %</Text>
            )}

            {joinedPoolInfo?.ticketType === 'Medium' ? (
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
            Max
          </Text>
          <VStack>
            {poolInfo?.max?.txLimit && (
              <Text>Transactions per minute: Maximum</Text>
            )}
            {poolInfo?.max?.discount && (
              <Text>Discount fee: {poolInfo.max.discount} %</Text>
            )}

            {joinedPoolInfo?.ticketType === 'Advance' ? (
              <Button variant="solid" color="red.300" onClick={onLeavePool}>
                Leave
              </Button>
            ) : (
              <Button
                color="primary"
                variant="solid"
                onClick={() => onJoinPool('Max')}
                isLoading={selectedPool === 'Max'}
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
