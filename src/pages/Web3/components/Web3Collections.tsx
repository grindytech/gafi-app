import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';

export interface Web3CollectionsDataProps {
  owner: string;
  game_id: number[];
  collection_id: number;
}

export interface Web3CollectionsProps {
  data: Web3CollectionsDataProps[];
}

export default function Web3Collections({ data }: Web3CollectionsProps) {
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
        {data.map(collection => (
          <Box
            key={collection.collection_id}
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
                  {collection.game_id.length} games
                </Heading>

                <Text color="shader.a.500" fontSize="sm">
                  ID:&nbsp;
                  <Text color="primary.a.500" as="span">
                    {collection.collection_id}
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
