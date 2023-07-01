import { Center, Stack } from '@chakra-ui/react';

import PoolsSponsoredTable from './PoolsSponsoredTable';
import PoolsSponsoredAdd from './PoolsSponsoredAdd';
import PoolsSponsoredSearch from './PoolsSponsoredSearch';

export default function PoolsSponsored() {
  return (
    <Stack spacing={4}>
      <Center justifyContent="space-between">
        <PoolsSponsoredSearch />

        <PoolsSponsoredAdd />
      </Center>

      <PoolsSponsoredTable />
    </Stack>
  );
}
