import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';

import React from 'react';

export interface Web3GamesDataProps {
  owner: string;
  game_id: number;
  collections: number[];
}

export interface Web3GamesProps {
  data: Web3GamesDataProps[];
}

export default function Web3Games({ data }: Web3GamesProps) {
  return (
    <>
      <Grid
        gridTemplateColumns={{
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
          xl: 'repeat(4, 1fr)',
        }}
        gap={5}
        fontWeight="medium"
      >
        {data.map(game => (
          <Box
            key={game.game_id}
            border="0.0625rem solid"
            borderColor="shader.a.300"
            borderRadius="xl"
          >
            <Flex
              bg="white"
              borderRadius="inherit"
              flexDirection="column"
              gap={3}
              padding={4}
              wordBreak="break-word"
            >
              <Flex gap="inherit">
                <Heading
                  flex={1}
                  as="h3"
                  color="primary.a.500"
                  fontSize="md"
                  fontWeight="inherit"
                >
                  {game.collections.length} collections
                </Heading>

                <Text color="shader.a.500" fontSize="sm">
                  ID:&nbsp;
                  <Text color="primary.a.500" as="span">
                    {game.game_id}
                  </Text>
                </Text>
              </Flex>
            </Flex>
          </Box>
        ))}
      </Grid>
    </>
  );
}
