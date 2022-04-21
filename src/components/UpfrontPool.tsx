import { Box, HStack, Text, useToast, VStack, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { useSubstrateState } from '../substrate-lib';

import Card from './card/Card';
import { getFromAcct, handleTxError } from './utils';

export interface TicketType {
  upfront?: string;
  staking?: string;
}

interface PoolJoinedInfo {
  address: string;
  joinTime: string;
  ticketType: TicketType;
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
  advance: {
    txLimit: number;
    discount: number;
    service: number;
  };
}

const JoinPool = () => {
  const toast = useToast();
  const { api, currentAccount } = useSubstrateState();
  const [selectedPool, setSelectedPool] = useState('');

  const { data: joinedPoolInfo, refetch } = useQuery(
    ['getJoinedUpfrontPool', currentAccount],
    async (): Promise<PoolJoinedInfo> => {
      const res = await api.query.upfrontPool.tickets(currentAccount.address);
      return res.toJSON();
    },
    {
      enabled: !!currentAccount,
    }
  );

  const { data: poolInfo } = useQuery(
    'getPoolInfo',
    async (): Promise<PoolInfo> => {
      const basic = await api.query.upfrontPool.services('Basic');
      const medium = await api.query.upfrontPool.services('Medium');
      const max = await api.query.upfrontPool.services('Advance');
      return {
        basic: {
          ...basic.toJSON(),
          service: basic.get('value').toString(),
        },
        medium: {
          ...medium.toJSON(),
          service: medium.get('value').toString(),
        },
        advance: {
          ...max.toJSON(),
          service: max.get('value').toString(),
        },
      };
    }
  );

  const onJoinPool = async (poolPackage: string) => {
    setSelectedPool(poolPackage);
    const fromAcct = await getFromAcct(currentAccount);
    const txExecute = api.tx.pool.join({ upfront: poolPackage });
    try {
      await txExecute
        // Temporary using any. Define type later.
        .signAndSend(...fromAcct, ({ status, events }: any) => {
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
        });
    } catch (err: any) {
      toast({
        description: `😞 Transaction Failed: ${err.toString()}`,
        isClosable: true,
        status: 'error',
      });
      setSelectedPool('');
    }
  };

  const onLeavePool = async () => {
    const fromAcct = await getFromAcct(currentAccount);
    const txExecute = api.tx.pool.leave();
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
        Upfront Pool
      </Text>
      {joinedPoolInfo && (
        <VStack>
          <Text>Joined pool type: {joinedPoolInfo.ticketType.upfront}</Text>
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

            {joinedPoolInfo?.ticketType.upfront === 'Basic' ? (
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

            {joinedPoolInfo?.ticketType.upfront === 'Medium' ? (
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
            {poolInfo?.advance?.txLimit && (
              <Text>Transactions per minute: Maximum</Text>
            )}
            {poolInfo?.advance?.discount && (
              <Text>Discount fee: {poolInfo.advance.discount} %</Text>
            )}

            {joinedPoolInfo?.ticketType.upfront === 'Advance' ? (
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

export default JoinPool;
