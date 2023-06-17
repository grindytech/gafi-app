import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import React from 'react';

export interface Web3ItemsDataProps {
  collection_id: number;
  item_id: number;
}

interface Web3ItemsProps {
  data: Web3ItemsDataProps[][];
}

export default function Web3Items({ data }: Web3ItemsProps) {
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
        {data.map(item =>
          item.map(child => (
            <Box
              key={child.item_id}
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
                    collection {child.collection_id}
                  </Heading>

                  <Text color="shader.a.500" fontSize="sm">
                    ID:&nbsp;
                    <Text color="primary.a.500" as="span">
                      {child.item_id}
                    </Text>
                  </Text>
                </Flex>
              </Flex>
            </Box>
          ))
        )}
      </Grid>
    </>
  );
}
