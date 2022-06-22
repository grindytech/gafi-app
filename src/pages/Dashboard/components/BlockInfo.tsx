import { HStack, VStack, Text, Box, Image } from '@chakra-ui/react';
import { BlockNumber as GafiBlockNumber } from '@polkadot/types/interfaces';
import { useEffect, useState } from 'react';
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
    // Temporary use any. Define type later.
    let unsubscribeAll: any = null;

    // Temporary use any. Define type later.
    bestNumber &&
      bestNumber((number: GafiBlockNumber) => {
        // Append `.toLocaleString('en-US')` to display a nice thousand-separated digit.
        setBlockNumber(number.toNumber().toLocaleString('en-US'));
        setBlockNumberTimer(0);
      })
        // Temporary use any. Define type later.
        .then((unsub: any) => {
          unsubscribeAll = unsub;
        })
        .catch(console.error);

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
    <Card flex={1}>
      <HStack justifyContent="space-between">
        <VStack alignItems="flex-start">
          <Text>{isFinalized ? t('FINALIZED_BLOCK') : t('CURRENT_BLOCK')}</Text>
          <Text color="primary" fontWeight="bold" fontSize="4xl">
            {blockNumber}
          </Text>
        </VStack>
        <Box
          bg="greyBg"
          p={4}
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
