import { Flex, Grid } from '@chakra-ui/react';

import HomeExtraordinary from 'layouts/MarketPlace/Home/HomeExtraordinary';
import HomeTrendingCollection from 'layouts/MarketPlace/Home/HomeTrendingCollection';
import HomeTopCategory from 'layouts/MarketPlace/Home/HomeTopCategory';
import HomeRecentlySold from 'layouts/MarketPlace/Home/HomeRecently/HomeRecentlySold';
import HomeRecentlyMint from 'layouts/MarketPlace/Home/HomeRecently/HomeRecentlyMint';
import HomeTopPools from 'layouts/MarketPlace/Home/HomeTopPools';
import HomeLiveAuction from 'layouts/MarketPlace/Home/HomeGameArticle';
import HomeNewGames from 'layouts/MarketPlace/Home/HomeNewGames';
import HomeTopAdventure from 'layouts/MarketPlace/Home/HomeTopAdventure';
import HomeTopFightGame from 'layouts/MarketPlace/Home/HomeTopFightGame';
import HomeGameEvent from 'layouts/MarketPlace/Home/HomeGameEvent';
import HomeGameArticle from 'layouts/MarketPlace/Home/HomeGameArticle';

export default function HomeMarketPlace() {
  return (
    <Flex flexDirection="column" gap={6}>
      <HomeExtraordinary />

      <HomeTrendingCollection />

      <HomeTopCategory />

      <Grid
        my={5}
        gridTemplateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
        gap={5}
      >
        <HomeRecentlySold />

        <HomeRecentlyMint />
      </Grid>

      <HomeTopPools />

      <HomeLiveAuction />

      <HomeNewGames />

      <HomeTopAdventure />

      <HomeTopFightGame />

      <HomeGameEvent />

      <HomeGameArticle />
    </Flex>
  );
}
