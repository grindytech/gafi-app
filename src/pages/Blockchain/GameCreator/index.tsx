import { Center, Heading, Stack } from '@chakra-ui/react';
import GameCreatorClaim from './GameCreatorClaim';
import GameCreatorTable from './GameCreatorTable';

export default function GameCreator() {
  return (
    <Stack spacing={4}>
      <Center justifyContent="space-between">
        <Heading fontSize="sm" fontWeight="medium" color="shader.a.800">
          Total 1,000 Contract
        </Heading>

        <GameCreatorClaim />
      </Center>

      <GameCreatorTable />
    </Stack>
  );
}
