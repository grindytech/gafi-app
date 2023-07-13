import { Box, Center, Grid, Heading, Image, Text } from '@chakra-ui/react';
import { cloundinary_link } from 'axios/cloudinary_axios';
import { TypeMetadataOfItem } from 'types';

export interface Web3ItemsDataProps {
  collection_id: number;
  item_id: number;
  supply: string | null;
  metadataOfItem: TypeMetadataOfItem;
}

interface Web3ItemsProps {
  data: Web3ItemsDataProps[][];
}

export default function Web3Items({ data }: Web3ItemsProps) {
  return (
    <Grid
      gridTemplateColumns={{
        sm: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
        xl: 'repeat(4, 1fr)',
      }}
      gap={5}
      fontWeight="medium"
      sx={{
        '.card-heading': {
          fontSize: 'sm',
          fontWeight: 'normal',
          color: 'shader.a.600',
        },
        '.card-value': {
          fontSize: 'sm',
          fontWeight: 'medium',
          color: 'shader.a.900',
        },
      }}
    >
      {data.map(item =>
        item.map(child => (
          <Box
            key={child.item_id}
            border="0.0625rem solid"
            borderColor="shader.a.300"
            borderRadius="xl"
            overflow="hidden"
            display="flex"
            flexDirection="column"
          >
            <Center
              bg="shader.a.300"
              position="relative"
              width="full"
              pt={(9 / 16) * 100 + '%'} // 16:9 Aspect Ratio
              overflow="hidden"
              sx={{
                img: {
                  position: 'absolute',
                  inset: 0,
                  width: 'full',
                  height: 'full',
                },
              }}
            >
              {child.metadataOfItem?.image ? (
                <Image
                  objectFit="cover"
                  alt="image is outdated"
                  src={`${cloundinary_link}/${child.metadataOfItem.image}`}
                />
              ) : (
                <Image src="/assets/fill/item.png" objectFit="none" />
              )}
            </Center>

            <Box padding={4} bg="white">
              <Center justifyContent="space-between" mb={1}>
                <Heading className="card-value" fontSize="md!">
                  {child.metadataOfItem?.title || '-'}
                </Heading>

                <Text className="card-value" color="shader.a.500!">
                  ID:&nbsp;
                  <Text as="span" color="primary.a.500">
                    {child.item_id}
                  </Text>
                </Text>
              </Center>

              <Center justifyContent="space-between">
                <Heading className="card-heading">Supply</Heading>

                <Text className="card-value">{child.supply || 'Infinity'}</Text>
              </Center>

              <Center justifyContent="space-between">
                <Heading className="card-heading">Collection ID</Heading>

                <Text className="card-value">{child.collection_id}</Text>
              </Center>
            </Box>
          </Box>
        ))
      )}
    </Grid>
  );
}
