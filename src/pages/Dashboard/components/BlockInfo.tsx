import { HStack, VStack, Text, Box, Image, Heading } from '@chakra-ui/react';
import { VoidFn } from '@polkadot/api/types';
import { BlockNumber as GafiBlockNumber } from '@polkadot/types/interfaces';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Card from 'components/card/Card';
import { useSubstrateState } from 'contexts/substrateContext';

interface IProps {
  isFinalized?: boolean;
}

const BlockInfo: React.FC<IProps> = ({ isFinalized }) => {
  const { t } = useTranslation();
  const { api } = useSubstrateState();
  const [blockNumber, setBlockNumber] = useState('0');
  const [blockNumberTimer, setBlockNumberTimer] = useState(0);

  const bestNumber =
    isFinalized && api
      ? api?.derive.chain.bestNumberFinalized
      : api?.derive.chain.bestNumber;

  useEffect(() => {
    let unsubscribeAll: VoidFn | undefined;

    if (bestNumber) {
      bestNumber((number: GafiBlockNumber) => {
        // Append `.toLocaleString('en-US')` to display a nice thousand-separated digit.
        setBlockNumber(number.toNumber().toLocaleString('en-US'));
        setBlockNumberTimer(0);
      })
        .then((unsub: VoidFn) => {
          unsubscribeAll = unsub;
        })
        .catch(console.error);
    }

    return () => unsubscribeAll && unsubscribeAll();
  }, [bestNumber]);

  const timer = () => {
    setBlockNumberTimer(time => time + 1);
  };

  useEffect(() => {
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Card h="full" justifyContent="space-between">
      <HStack justifyContent="space-between">
        <VStack alignItems="flex-start">
          <Heading size="sm">
            {isFinalized ? t('FINALIZED_BLOCK') : t('CURRENT_BLOCK')}
          </Heading>
          <Text color="primary" fontWeight="bold" fontSize="4xl">
            {blockNumber}
          </Text>
        </VStack>
        <Box
          sx={{
            borderRadius: '50%',
          }}
        >
          <Image
            src={
              isFinalized
                ? '/assets/layout/finalized-block.svg'
                : '/assets/layout/current-block.svg'
            }
            alt="current block"
          />
        </Box>
      </HStack>
      <Text>{blockNumberTimer}</Text>
    </Card>
  );
};

export default BlockInfo;
