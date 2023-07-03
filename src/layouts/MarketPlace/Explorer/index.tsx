import ExplorerBanner from './components/ExplorerBanner';
import HotCollection from './components/HotCollection';

import TrendingSection from './components/TrendingSection';
import TopPool from './components/TopPool';
import { Grid } from '@chakra-ui/react';
import RecentSold from './components/RecentSold';
import RecentMint from './components/RecentMint';
import LiveAuction from './components/LiveAuction';
export default function Explorer() {
  return (
    <>
      <ExplorerBanner />
      <HotCollection />
      <Grid
        my={5}
        gridTemplateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
        columnGap={5}
        rowGap={5}
      >
        <RecentSold />
        <RecentMint />
      </Grid>
      <TrendingSection />
      <TopPool />
      <LiveAuction />
    </>
  );
}
