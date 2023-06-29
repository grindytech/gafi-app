import { Box, HStack, Image, VStack, Text } from '@chakra-ui/react';
import { VoidFn } from '@polkadot/api/types';
import { useAppSelector } from 'hooks/useRedux';
import { BlockNumber as GafiBlockNumber } from '@polkadot/types/interfaces';
import React, { useEffect, useState } from 'react';
import CountDown from './CountDown';
import CardBox from 'components/CardBox';
interface IProps {
  isFinalize?: boolean;
}
const BlockInfo = ({ isFinalize }: IProps) => {
  const { api } = useAppSelector(state => state.substrate);
  const bestNumber =
    isFinalize && api
      ? api?.derive.chain.bestNumberFinalized
      : api?.derive.chain.bestNumber;
  const [blockNumber, setBlockNumber] = useState('0');

  useEffect(() => {
    let unsubscribeAll: VoidFn | undefined;

    if (bestNumber) {
      bestNumber((number: GafiBlockNumber) => {
        // Append `.toLocaleString('en-US')` to display a nice thousand-separated digit.
        setBlockNumber(number.toNumber().toLocaleString('en-US'));
      })
        .then((unsub: VoidFn) => {
          unsubscribeAll = unsub;
        })
        .catch(console.error);
    }

    return () => unsubscribeAll && unsubscribeAll();
  }, [bestNumber]);

  return (
    <CardBox variant="baseStyle">
      <HStack gap={6} position="relative">
        <Image
          src={
            isFinalize
              ? 'assets/art/block-finalized.svg'
              : 'assets/art/block-current.svg'
          }
          alt="current block"
        />
        <VStack alignItems={'start'}>
          <Text color="shader.a.900" fontSize="md" fontWeight="medium">
            {isFinalize ? 'Finalized Block' : 'Current Block'}
          </Text>
          <Text fontWeight="bold" color="primary.a.500">
            {blockNumber}
          </Text>
        </VStack>

        <Box
          gap={0}
          position="absolute"
          display="inline-flex"
          alignItems="center"
          sx={{
            right: '0',
            fontsize: 'sm',
            top: '-15%',
          }}
        >
          <CountDown blockNumber={blockNumber} />
          <Text color="primary.a.500">s</Text>
        </Box>
      </HStack>
    </CardBox>
  );
};

export default BlockInfo;
