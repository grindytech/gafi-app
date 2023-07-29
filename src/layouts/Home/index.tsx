import HeroSection from './components/HeroSection';
import BlockInfo from './components/Block/BlockInfo';
import { Grid, HStack, VStack } from '@chakra-ui/react';
import RecentEvents from './components/RecentEvents';
import SubstrateNode from 'components/Substrate/SubstrateNode';
import MetaData from './components/MetaData';

const Home = () => {
  return (
    <>
      <HeroSection />
      <Grid
        gridTemplateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
        columnGap={5}
        rowGap={5}
      >
        <VStack gap={4}>
          <HStack width="full" flexWrap={{ base: 'wrap', lg: 'nowrap' }}>
            <BlockInfo />
            <BlockInfo isFinalize={true} />
          </HStack>
          <SubstrateNode />
          <MetaData />
        </VStack>
        <RecentEvents />
      </Grid>
    </>
  );
};

export default Home;
