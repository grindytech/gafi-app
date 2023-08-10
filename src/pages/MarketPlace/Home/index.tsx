import { Divider, Flex } from '@chakra-ui/react';
import TrendingCollection from './TrendingCollection';
import Extraordinary from './Extraordinary';

import SectionTop from './SectionTop';
import TopPools from './TopPools';

export default function HomeMarketPlace() {
  return (
    <Flex flexDirection="column" gap={6}>
      <Extraordinary />

      <TrendingCollection />

      <Divider bg="shader.a.300" opacity={1} />

      <SectionTop />

      <Divider bg="shader.a.300" opacity={1} />

      <TopPools />
    </Flex>
  );
}
