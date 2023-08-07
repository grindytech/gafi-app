import { Flex } from '@chakra-ui/react';
import TrendingCollection from './TrendingCollection';
import Extraordinary from './Extraordinary';

export default function HomeMarketPlace() {
  return (
    <Flex flexDirection="column" gap={6}>
      <Extraordinary />

      <TrendingCollection />
    </Flex>
  );
}
