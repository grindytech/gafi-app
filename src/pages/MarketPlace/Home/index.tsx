import OverviewCollection from 'layouts/MarketPlace/Home/Collections';
import OverviewGames from 'layouts/MarketPlace/Home/Games';
import { Flex } from '@chakra-ui/react';

const HomeMarketPlace = () => {
  return (
    <>
      <Flex flexDirection="column" gap={6}>
        <OverviewCollection />
        <OverviewGames />
      </Flex>
    </>
  );
};

export default HomeMarketPlace;
