import { Box, HStack, Text, useToast, VStack } from '@chakra-ui/react';
import { Balance } from '@polkadot/types/interfaces';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Button } from 'semantic-ui-react';

import { useSubstrateState } from '../substrate-lib';

import { getFromAcct } from './utils';

interface PoolJoinedInfo {
  address: string;
  joinTime: string;
  service: string;
}

const JoinPool = () => {
  const toast = useToast();
  const { api, currentAccount } = useSubstrateState();

  const { data: joinedPoolInfo, refetch } = useQuery(
    ['getJoinedPool', currentAccount],
    async () => {
      const res = await api.query.pool.players(currentAccount.address);
      return res.toJSON();
    },
    {
      enabled: !!currentAccount,
    }
  );

  const onJoinPool = async (poolPackage: string) => {
    const fromAcct = await getFromAcct(currentAccount);
    const txExecute = api.tx.pool.join(poolPackage);
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
      })
      // Temporary using any. Define type later.
      .catch((err: any) =>
        toast({
          description: `😞 Transaction Failed: ${err.toString()}`,
          isClosable: true,
          status: 'error',
        })
      );
  };

  return (
    <Box>
      JoinPool
      {joinedPoolInfo && (
        <VStack>
          <Text>Joined pool type: {joinedPoolInfo.service}</Text>
          <Text>
            Time: {new Date(Number(joinedPoolInfo.joinTime)).toLocaleString()}
          </Text>
        </VStack>
      )}
      <HStack>
        <Button
          onClick={() => onJoinPool('Basic')}
          disabled={joinedPoolInfo?.service === 'Basic'}
        >
          Basic
        </Button>
        <Button
          onClick={() => onJoinPool('Medium')}
          disabled={joinedPoolInfo?.service === 'Medium'}
        >
          Medium
        </Button>
        <Button
          onClick={() => onJoinPool('Max')}
          disabled={joinedPoolInfo?.service === 'Max'}
        >
          Max
        </Button>
      </HStack>
    </Box>
  );
};

export default JoinPool;
