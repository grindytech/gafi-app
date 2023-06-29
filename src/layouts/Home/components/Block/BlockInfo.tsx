import { HStack, VStack, Text } from '@chakra-ui/react';
import { VoidFn } from '@polkadot/api/types';
import { useAppSelector } from 'hooks/useRedux';
import { BlockNumber as GafiBlockNumber } from '@polkadot/types/interfaces';
import React, { useEffect, useState } from 'react';
import CountDown from './CountDown';
import CardBox from 'components/CardBox';
import CurrentBlockSVG from 'public/assets/art/block-current.svg';
import FinalizeBlockSVG from 'public/assets/art/block-finalized.svg';
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
      <HStack gap={6}>
        {isFinalize ? <FinalizeBlockSVG /> : <CurrentBlockSVG />}
        <VStack alignItems="start" flex={1}>
          <HStack justifyContent="space-between" width="full">
            <Text color="shader.a.900" fontSize="md" fontWeight="medium">
              {isFinalize ? 'Finalized Block' : 'Current Block'}
            </Text>
            <CountDown blockNumber={blockNumber} />
          </HStack>

          <Text fontWeight="bold" color="primary.a.500">
            {blockNumber}
          </Text>
        </VStack>
      </HStack>
    </CardBox>
  );
};

export default BlockInfo;
