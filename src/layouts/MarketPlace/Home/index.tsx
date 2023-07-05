import React from 'react';
import OverviewCollection from './Collections';
import OverviewGames from './Games';
import { Flex } from '@chakra-ui/react';

const HomeMarketPlace = () => {
  return (
    <>
      <Flex flexDirection="column" gap={10}>
        <OverviewCollection />
        <OverviewGames />
      </Flex>
    </>
  );
};

export default HomeMarketPlace;
