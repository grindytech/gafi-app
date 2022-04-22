import { Box, HStack, Text, useToast, VStack, Button } from '@chakra-ui/react';
import { Option } from '@polkadot/types';
import { GafiPrimitivesPoolService, GafiPrimitivesPoolTicket } from '@polkadot/types/lookup';
import { Callback, ISubmittableResult } from '@polkadot/types/types';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { useSubstrateState } from '../substrate-lib';

import Card from './card/Card';
import { getFromAcct, handleTxError } from './utils';

export interface TicketType {
  upfront?: string;
  staking?: string;
}

interface PoolInfo {
  basic: GafiPrimitivesPoolService;
  medium: GafiPrimitivesPoolService;
  advance:GafiPrimitivesPoolService;
}

const JoinPool = () => {
  const toast = useToast();
  const { api, currentAccount } = useSubstrateState();
  const [selectedPool, setSelectedPool] = useState('');

  const { data: joinedPoolInfo, refetch } = useQuery(
    ['getJoinedUpfrontPool', currentAccount],
    async (): Promise<GafiPrimitivesPoolTicket | undefined > => {
      if (api) {
        const res = await api.query.upfrontPool.tickets(currentAccount.address as string);
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
    async (): Promise<PoolInfo| undefined> => {
      if (api) {
        const basic = await api.query.upfrontPool.services('Basic');
        const medium = await api.query.upfrontPool.services('Medium');
        const advance = await api.query.upfrontPool.services('Advance');
        return {
          basic,
          medium,
          advance,
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
  }

  const onJoinPool = async (poolPackage: string) => {
    setSelectedPool(poolPackage);
    const [account, options] = await getFromAcct(currentAccount);

    if (api && account) {
      const txExecute = api.tx.pool.join({ Upfront: poolPackage });
      if (options) {
        try {
          await txExecute
            .signAndSend(account, options, txCallback);
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
          await txExecute
            .signAndSend(account, txCallback);
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
    if (api) {
      
      const txExecute = api.tx.pool.leave();
      if (options) {
        try {
          await txExecute
          .signAndSend(account, options, txCallback);
        } catch (err: any) {
          toast({
            description: `😞 Transaction Failed: ${err.toString()}`,
            isClosable: true,
            status: 'error',
          });
        } finally {
        }
      } else {
        try {
          await txExecute
          .signAndSend(account, txCallback);
        } catch (err: any) {
          toast({
            description: `😞 Transaction Failed: ${err.toString()}`,
            isClosable: true,
            status: 'error',
          });
        } finally {
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
            Time: {new Date(joinedPoolInfo.joinTime.toNumber()).toLocaleString()}
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
              <Text>Transactions per minute: {poolInfo.basic.txLimit.toNumber()}</Text>
            )}
            {poolInfo?.basic?.discount && (
              <Text>Discount fee: {poolInfo.basic.discount.toNumber()} %</Text>
            )}

            {joinedPoolInfo?.ticketType.asUpfront.isBasic ? (
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
              <Text>Transactions per minute: {poolInfo.medium.txLimit.toNumber()}</Text>
            )}
            {poolInfo?.medium?.discount && (
              <Text>Discount fee: {poolInfo.medium.discount.toNumber()} %</Text>
            )}

            {joinedPoolInfo?.ticketType.asUpfront.isMedium ? (
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
            Advance
          </Text>
          <VStack>
            {poolInfo?.advance?.txLimit && (
              <Text>Transactions per minute: Maximum</Text>
            )}
            {poolInfo?.advance?.discount && (
              <Text>Discount fee: {poolInfo.advance.discount.toNumber()} %</Text>
            )}

            {joinedPoolInfo?.ticketType.asUpfront.isAdvance ? (
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
