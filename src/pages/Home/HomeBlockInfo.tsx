import { Box, HStack, Text, VStack } from '@chakra-ui/react';

import useBlockTime, { TypeUseBlockTime } from 'hooks/useBlockTime';

import CurrentBlockSVG from 'public/assets/art/block-current.svg';
import FinalizeBlockSVG from 'public/assets/art/block-finalized.svg';
import { useEffect, useState } from 'react';

interface HomeBlockInfoProps {
  type: TypeUseBlockTime;
}

export default function HomeBlockInfo({ type }: HomeBlockInfoProps) {
  const { blockNumber } = useBlockTime(type);

  const [blockNumberTimer, setBlockNumberTimer] = useState(0);

  useEffect(() => {
    const subscribe = setInterval(
      () => setBlockNumberTimer(time => time + 1),
      1000
    );

    return () => clearInterval(subscribe);
  }, []);

  useEffect(() => {
    setBlockNumberTimer(0);
  }, [blockNumber]);

  return (
    <Box
      borderRadius="xl"
      border="0.0625rem solid"
      borderColor="shader.a.800"
      bg="shader.a.900"
      width="full"
      padding={4}
    >
      <HStack spacing={4}>
        {type === 'bestNumberFinalized' ? (
          <FinalizeBlockSVG />
        ) : (
          <CurrentBlockSVG />
        )}

        <VStack alignItems="start" flex={1}>
          <HStack
            justifyContent="space-between"
            width="full"
            fontWeight="medium"
          >
            <Text color="white">
              {type === 'bestNumberFinalized'
                ? 'Finalized Block'
                : 'Current Block'}
            </Text>

            <Text color="primary.a.400" fontSize="sm">
              {blockNumberTimer}s
            </Text>
          </HStack>

          <Text fontSize="2xl" fontWeight="bold" color="primary.a.400">
            {blockNumber}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}
