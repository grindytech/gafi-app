import { Box, Button, HStack, Text, useToast, VStack } from '@chakra-ui/react';
import { GafiPrimitivesPoolTicket } from '@polkadot/types/lookup';
import { ISubmittableResult } from '@polkadot/types/types';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { useSubstrate, useSubstrateState } from '../substrate-lib';

import { PoolInfo } from 'gafi-dashboard/interfaces';
import Card from './card/Card';
import { getFromAcct, handleTxError } from './utils';
import { BN, formatBalance } from '@polkadot/util';

export interface TicketType {
  upfront?: string;
  staking?: string;
}

const JoinPool = () => {
  const toast = useToast();
  const { api, currentAccount, chainDecimal } = useSubstrateState();
  const [selectedPool, setSelectedPool] = useState('');
  const { data: joinedPoolInfo, refetch } = useQuery(
    ['getJoinedUpfrontPool', currentAccount],
    async (): Promise<GafiPrimitivesPoolTicket | undefined> => {
      if (api) {
        const res = await api.query.upfrontPool.tickets(
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
    'getPoolInfo',
    async (): Promise<PoolInfo | undefined> => {
      if (api) {
        const basic = await api.query.upfrontPool.services('Basic');
        const medium = await api.query.upfrontPool.services('Medium');
        const advance = await api.query.upfrontPool.services('Advance');
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
      const txExecute = api.tx.pool.join({ Upfront: poolPackage });
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

  const onLeavePool = async (poolPackage: string) => {
    setSelectedPool(poolPackage);
    const [account, options] = await getFromAcct(currentAccount);
    if (api) {
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
        } finally {
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
        } finally {
          setSelectedPool('');
        }
      }
    }
  };

  return (
    <Box pt={{ base: '120px', md: '75px' }}>
      <Text fontWeight="bold" fontSize="2xl" mb={5}>
        Upfront Pool
      </Text>
      {joinedPoolInfo && (
        <VStack>
          {/* <Text>Joined pool type: {joinedPoolInfo.ticketType.upfront}</Text> */}
          <Text>
            Time:{' '}
            {new Date(joinedPoolInfo.joinTime.toNumber()).toLocaleString()}
          </Text>
        </VStack>
      )}
      <HStack p={5} gap={5}>
        <Card>
          <Text textAlign="center" fontWeight="bold" mb={5}>
            Basic
          </Text>
          <VStack>
            {poolInfo?.basic?.service?.txLimit && (
              <Text>
                Transactions per minute:{' '}
                {poolInfo.basic.service.txLimit.toNumber()}
              </Text>
            )}
            {poolInfo?.basic?.service?.discount && (
              <Text>
                Discount fee: {poolInfo.basic.service.discount.toNumber()} %
              </Text>
            )}
            {poolInfo?.basic.value && (
              <Text>
                Fee:{' '}
                {formatBalance(
                  poolInfo?.basic.value.toString(),
                  { withSi: true, forceUnit: '-', withUnit: 'GAKI' },
                  chainDecimal
                )}{' '}
                / 30 minute
              </Text>
            )}

            {joinedPoolInfo?.ticketType.asUpfront.type === 'Basic' ? (
              <Button
                variant="solid"
                color="red.300"
                onClick={() => onLeavePool('Basic')}
                isLoading={selectedPool === 'Basic'}
              >
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
            {poolInfo?.medium.service.txLimit && (
              <Text>
                Transactions per minute:{' '}
                {poolInfo?.medium.service.txLimit.toNumber()}
              </Text>
            )}
            {poolInfo?.medium.service.discount && (
              <Text>
                Discount fee: {poolInfo?.medium.service.discount.toNumber()} %
              </Text>
            )}
            {poolInfo?.medium.value && (
              <Text>
                Fee:{' '}
                {formatBalance(
                  poolInfo?.medium.value.toString(),
                  { withSi: true, forceUnit: '-', withUnit: 'GAKI' },
                  chainDecimal
                )}{' '}
                / 30 minute
              </Text>
            )}

            {joinedPoolInfo?.ticketType.asUpfront.isMedium ? (
              <Button
                variant="solid"
                color="red.300"
                onClick={() => onLeavePool('Medium')}
                isLoading={selectedPool === 'Medium'}
              >
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
            Advance
          </Text>
          <VStack>
            {poolInfo?.advance?.service.txLimit && (
              <Text>Transactions per minute: Maximum</Text>
            )}
            {poolInfo?.advance?.service.discount && (
              <Text>
                Discount fee: {poolInfo.advance.service.discount.toNumber()} %
              </Text>
            )}
            {poolInfo?.advance.value && (
              <Text>
                Fee:{' '}
                {formatBalance(
                  poolInfo?.advance.value.toString(),
                  { withSi: true, forceUnit: '-', withUnit: 'GAKI' },
                  chainDecimal
                )}{' '}
                / 30 minute
              </Text>
            )}

            {joinedPoolInfo?.ticketType.asUpfront.isAdvance ? (
              <Button
                variant="solid"
                color="red.300"
                onClick={() => onLeavePool('Advance')}
                isLoading={selectedPool === 'Advance'}
              >
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
