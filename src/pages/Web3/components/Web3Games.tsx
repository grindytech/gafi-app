import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';

import AccountJazzicon from 'components/AccountJazzicon/AccountJazzicon';
import AvatarPopover from 'components/Avatar/AvatarPopover';
import RatioPicture from 'components/RatioPicture';
import React from 'react';
import { TagOfCollection } from './Web3Collections';

export interface Web3GamesDataProps {
  owner: string;
  role: string;
  game_id: number;
  collection: number[];
}

export interface Web3GamesProps {
  data: Web3GamesDataProps[];
}

export default function Web3Games({ data }: Web3GamesProps) {
  return (
    <Grid
      gridTemplateColumns={{
        sm: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
        xl: 'repeat(4, 1fr)',
      }}
      gap={5}
      fontWeight="medium"
    >
      {React.Children.toArray(
        data.map(({ collection, game_id, owner, role }) => (
          <Box
            border="0.0625rem solid"
            borderColor="shader.a.300"
            borderRadius="xl"
          >
            <RatioPicture src={null} alt={game_id} />

            <Stack bg="white" spacing={3} padding={4} flex={1}>
              <Flex>
                <AvatarPopover type="Owner" address={owner} name="-">
                  <AccountJazzicon
                    address={owner}
                    sx={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </AvatarPopover>

                <AvatarPopover type="Admin" address={role} name="-">
                  <AccountJazzicon
                    address={role}
                    sx={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </AvatarPopover>
              </Flex>

              <Center justifyContent="space-between">
                <Heading fontSize="md" fontWeight="medium" color="shader.a.900">
                  -
                </Heading>

                <Text fontSize="sm" fontWeight="medium" color="shader.a.500">
                  ID:&nbsp;
                  <Text as="span" color="primary.a.500">
                    {game_id}
                  </Text>
                </Text>
              </Center>

              <Flex py={2} gap={2} overflowX="auto">
                {collection.length ? (
                  React.Children.toArray(
                    collection.map(id => <TagOfCollection title={String(id)} />)
                  )
                ) : (
                  <TagOfCollection title="-" />
                )}
              </Flex>
            </Stack>
          </Box>
        ))
      )}
    </Grid>
  );
}
