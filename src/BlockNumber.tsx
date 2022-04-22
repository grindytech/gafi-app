import { HStack, VStack, Text, Icon, Divider } from '@chakra-ui/react';
import { mdiClock } from '@mdi/js';
import { BlockNumber as GafiBlockNumber } from '@polkadot/types/interfaces';
import React, { useEffect, useState } from 'react';

import Card from './components/card/Card';
import { useSubstrateState } from './substrate-lib';

interface IProps {
  finalized?: boolean;
}

const Main: React.FC<IProps> = props => {
  const { api } = useSubstrateState();
  const { finalized } = props;
  const [blockNumber, setBlockNumber] = useState("0");
  const [blockNumberTimer, setBlockNumberTimer] = useState(0);

  const bestNumber = finalized
    ? api?.derive.chain.bestNumberFinalized
    : api?.derive.chain.bestNumber;

  useEffect(() => {
    // Temporary use any. Define type later.
    let unsubscribeAll: any = null;

    // Temporary use any. Define type later.
    bestNumber && bestNumber((number: GafiBlockNumber) => {
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
    <Card>
      <VStack textAlign="center" pb={5}>
        <Text fontSize="xx-large">{blockNumber}</Text>
        <Text textTransform="uppercase" fontWeight="bold">{`${
          finalized ? 'Finalized' : 'Current'
        } Block`}</Text>
      </VStack>
      <Divider />
      <HStack pt={5}>
        <Icon color="gray.500">
          <path fill="currentColor" d={mdiClock} />
        </Icon>
        <Text as="span" color="gray.500">
          {blockNumberTimer}
        </Text>
      </HStack>
    </Card>
  );
};

export default function BlockNumber(props: IProps) {
  const { api } = useSubstrateState();
  return api?.derive &&
    api.derive.chain &&
    api.derive.chain.bestNumber &&
    api.derive.chain.bestNumberFinalized ? (
    <Main {...props} />
  ) : null;
}
