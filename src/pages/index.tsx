import { Divider } from '@chakra-ui/react';
import AuctionsAndBundles from 'layouts/Home/AuctionsAndBundles';
import Extraordinary from 'layouts/Home/Extraordinary';

import TrendingCollection from 'layouts/Home/TrendingCollection';

export default function Home() {
  return (
    <>
      <Extraordinary />

      <TrendingCollection />

      <Divider my={6} borderColor="shader.a.300" opacity={1} />

      <AuctionsAndBundles />
      {/* <TopAuctions /> */}

      {/* <TopBundles /> */}

      {/* <Divider bg="shader.a.300" opacity={1} /> */}

      {/* <TopPools /> */}
    </>
  );
}
