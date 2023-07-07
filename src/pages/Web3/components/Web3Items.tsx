import { Box, Flex, Grid, Image, List, ListItem, Text } from '@chakra-ui/react';
import { cloundinary_link } from 'axios/cloudinary_axios';
import { TypeMetadataOfItem } from 'types';

export interface Web3ItemsDataProps {
  collection_id: number;
  item_id: number;
  metadataOfItem: TypeMetadataOfItem;
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
                <Image
                  margin="auto"
                  width={40}
                  height={40}
                  objectFit="contain"
                  src={
                    child.metadataOfItem && child.metadataOfItem.image
                      ? `${cloundinary_link}/${child.metadataOfItem.image}`
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
                      {child.metadataOfItem
                        ? child.metadataOfItem.title
                        : 'none'}
                    </Text>
                    <Text as="span">ID: {child.item_id}</Text>
                  </ListItem>

                  <ListItem>
                    <Text>collection:</Text>
                    <Text as="span">ID: {child.item_id}</Text>
                  </ListItem>
                </List>
              </Flex>
            </Box>
          ))
        )}
      </Grid>
    </>
  );
}
