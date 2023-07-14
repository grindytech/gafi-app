import TopAdventureGame from './components/TopAdventureGame';
import TopFightGames from './components/TopFightGames';
import GameEvent from './components/GameEvent';
import GameArticles from './components/GameArticles';
import NewGamesSection from './components/NewGamesSection';

const OverviewGames = () => {
  return (
    <>
      <NewGamesSection />
      <TopAdventureGame />
      <TopFightGames />
      <GameEvent />
      <TopFightGames />
      <GameArticles />
    </>
  );
};

export default OverviewGames;
