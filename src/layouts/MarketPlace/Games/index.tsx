import React from 'react';
import TopAdventureGame from './components/TopAdventureGame';
import TopFightGames from './components/TopFightGames';
import GameEvent from './components/GameEvent';
import GameArticles from './components/GameArticles';
import { Flex } from '@chakra-ui/react';

const Games = () => {
  return (
    <>
      <Flex flexDirection="column" gap={10}>
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
