import { Center, Stack } from '@chakra-ui/react';
import PoolsBanner from './PoolsBanner';

import PoolsSponsoredTable from './PoolsSponsoredTable';
import PoolsSponsoredAdd from './PoolsSponsoredAdd';
import PoolsSponsoredSearch from './PoolsSponsoredSearch';

export default function PoolsSponsored() {
  return (
    <Stack spacing={6}>
      <PoolsBanner
        heading="Sponsored pool"
        body={`Gafi Pool offers the Sponsored Pool to give players more options to participate in Gafi
        Network and provide the method for game projects to appeal to their users.`}
        detail="#"
      />

      <Center>
        <PoolsSponsoredSearch />

        <PoolsSponsoredAdd />
      </Center>

      <PoolsSponsoredTable />
    </Stack>
  );
}
