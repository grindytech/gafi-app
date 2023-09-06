import { Grid, HStack, VStack } from '@chakra-ui/react';

import HomeWelcome from './HomeWelcome';
import HomeBlockInfo from './HomeBlockInfo';
import HomeSubstrateNode from './HomeSubstrateNode';
import HomeMetaData from './HomeMetaData';
import HomeRecentEvent from './HomeRecentEvent';

export default function Home() {
  return (
    <>
      <HomeWelcome />

      <Grid
        my={4}
        gridTemplateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
        gap={5}
      >
        <VStack gap={4}>
          <HStack width="full" flexWrap={{ base: 'wrap', lg: 'nowrap' }}>
            <HomeBlockInfo type="bestNumber" />

            <HomeBlockInfo type="bestNumberFinalized" />
          </HStack>

          <HomeSubstrateNode />

          <HomeMetaData />
        </VStack>

        <HomeRecentEvent />
      </Grid>
    </>
  );
}
