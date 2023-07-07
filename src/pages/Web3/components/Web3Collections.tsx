import { Box, Flex, Grid, Image, List, ListItem, Text } from '@chakra-ui/react';
import { cloundinary_link } from 'axios/cloudinary_axios';
import { TypeMetadataOfCollection } from 'types';

import { shorten } from 'utils/utils';

export interface Web3CollectionsDataProps {
  admin: string;
  owner: string;
  collection_id: number;
  metadataOfCollection: TypeMetadataOfCollection;
  game_id: number[];
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
              <Image
                margin="auto"
                width={40}
                height={40}
                objectFit="contain"
                src={
                  collection.metadataOfCollection &&
                  collection.metadataOfCollection.image
                    ? `${cloundinary_link}/${collection.metadataOfCollection.image}`
                    : 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'
                }
              />

              <List
                display="flex"
                flexDirection="column"
                sx={{
                  li: {
                    display: 'flex',
                    justifyContent: 'space-between',
                  },
                }}
              >
                <ListItem>
                  <Text>
                    {collection.metadataOfCollection?.title || 'none'}
                  </Text>
                  <Text>ID: {collection.collection_id}</Text>
                </ListItem>

                <ListItem>
                  <Text>Owner</Text>
                  <Text>{shorten(collection.owner)}</Text>
                </ListItem>

                <ListItem>
                  <Text>Admin</Text>
                  <Text>{shorten(collection.admin)}</Text>
                </ListItem>

                <ListItem color="primary.a.500">
                  <Text>{collection.game_id.length} games</Text>
                </ListItem>
              </List>
            </Flex>
          </Box>
        ))}
      </Grid>
    </>
  );
}
