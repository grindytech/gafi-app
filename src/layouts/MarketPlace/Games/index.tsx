import React from 'react';
import TopAdventureGame from './components/TopAdventureGame';
import TopFightGames from './components/TopFightGames';
import GameEvent from './components/GameEvent';
import GameArticles from './components/GameArticles';
import { Flex } from '@chakra-ui/react';
import NewRelease from './components/NewRelease';

const Games = () => {
  return (
    <>
      <Flex flexDirection="column" gap={10}>
        <NewRelease />
        <TopAdventureGame />
        <TopFightGames />
        <GameEvent />
        <TopFightGames />
        <GameArticles />
      </Flex>
    </>
  );
};

export default Games;
