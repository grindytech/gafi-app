import { Flex, Stack } from '@chakra-ui/react';
import PoolsBanner from '../Pools/components/PoolsBanner';

import GameCreatorClaim from './components/GameCreatorClaim';
import GameCreatorTable from './components/GameCreatorTable';

export default function GameCreator() {
  return (
    <>
      <Stack spacing={6}>
        <PoolsBanner
          heading="Game creator"
          body={`The concept of Game Creator is that the transaction fee in Gafi Network will be burned,
          sent to the reserve and a part of the transaction fee will be awarded to the Game Creator`}
          detail="#"
        />

        <Flex justifyContent="flex-end">
          <GameCreatorClaim />
        </Flex>

        <GameCreatorTable />
      </Stack>
    </>
  );
}
