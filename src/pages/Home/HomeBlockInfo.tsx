import { HStack, Text, VStack } from '@chakra-ui/react';
import CardBox from 'components/CardBox';

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
    <CardBox variant="baseStyle">
      <HStack gap={6}>
        {type === 'bestNumberFinalized' ? (
          <FinalizeBlockSVG />
        ) : (
          <CurrentBlockSVG />
        )}

        <VStack alignItems="start" flex={1}>
          <HStack justifyContent="space-between" width="full">
            <Text color="shader.a.900" fontSize="md" fontWeight="medium">
              {type === 'bestNumberFinalized'
                ? 'Finalized Block'
                : 'Current Block'}
            </Text>

            <Text color="primary.a.500" fontSize="sm">
              {blockNumberTimer}s
            </Text>
          </HStack>

          <Text fontWeight="bold" color="primary.a.500">
            {blockNumber}
          </Text>
        </VStack>
      </HStack>
    </CardBox>
  );
}
