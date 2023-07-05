import TopAdventureGame from './components/TopAdventureGame';
import TopFightGames from './components/TopFightGames';
import GameEvent from './components/GameEvent';
import GameArticles from './components/GameArticles';
import { Flex } from '@chakra-ui/react';
import NewRelease from './components/NewRelease';

const OverviewGames = () => {
  return (
    <>
      <NewRelease />
      <TopAdventureGame />
      <TopFightGames />
      <GameEvent />
      <TopFightGames />
      <GameArticles />
    </>
  );
};

export default OverviewGames;
