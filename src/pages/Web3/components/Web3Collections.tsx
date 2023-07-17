import {
  Box,
  BoxProps,
  Center,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { cloundinary_link } from 'axios/cloudinary_axios';
import AccountJazzicon from 'components/AccountJazzicon/AccountJazzicon';
import AvatarPopover from 'components/Avatar/AvatarPopover';
import { colors } from 'theme/theme';
import { TypeMetadataOfCollection } from 'types';

import { convertHex } from 'utils/utils';

export interface Web3CollectionsDataProps {
  owner: string;
  role: string;
  collection_id: number;
  getGamesOfCollection: number[];
  metadata: TypeMetadataOfCollection;
}

export interface Web3CollectionsProps {
  data: Web3CollectionsDataProps[];
}

export default function Web3Collections({ data }: Web3CollectionsProps) {
  const TagOfCollection = (props: BoxProps) => (
    <Box
      whiteSpace="pre"
      color="primary.a.500"
      fontSize="sm"
      fontWeight="medium"
      borderRadius="full"
      border="0.0625rem solid"
      borderColor={convertHex(colors.primary.a[500], 0.3)}
      py={1.5}
      px={3}
      {...props}
    >
      {props.title}
    </Box>
  );

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
      {data.map(collection => (
        <Box
          key={collection.collection_id}
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
            {collection.metadata?.image ? (
              <Image
                objectFit="cover"
                alt="image is outdated"
                src={`${cloundinary_link}/${collection.metadata.image}`}
              />
            ) : (
              <Image src="/assets/fill/item.png" objectFit="none" />
            )}
          </Center>

          <Stack bg="white" spacing={3} padding={4} flex={1}>
            <Flex>
              <AvatarPopover type="Owner" address={collection.owner} name="-">
                <AccountJazzicon
                  address={collection.owner}
                  sx={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </AvatarPopover>

              <AvatarPopover type="Admin" address={collection.role} name="-">
                <AccountJazzicon
                  address={collection.role}
                  sx={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </AvatarPopover>
            </Flex>

            <Center justifyContent="space-between">
              <Heading fontSize="md" fontWeight="medium" color="shader.a.900">
                {collection.metadata?.title || '-'}
              </Heading>

              <Text fontSize="sm" fontWeight="medium" color="shader.a.500">
                ID:&nbsp;
                <Text as="span" color="primary.a.500">
                  {collection.collection_id}
                </Text>
              </Text>
            </Center>

            <Box>
              <Heading
                as="h3"
                color="shader.a.700"
                fontWeight="normal"
                fontSize="md"
              >
                Games:&nbsp;
                <Text as="span" color="shader.a.900" fontWeight="medium">
                  {collection.getGamesOfCollection.length}
                </Text>
              </Heading>

              <Flex py={2} gap={2} overflowX="auto">
                {collection.getGamesOfCollection.length ? (
                  [...Array(collection.getGamesOfCollection)].map(
                    (_, index) => (
                      <TagOfCollection key={index} title="Heroes & Empires" />
                    )
                  )
                ) : (
                  <TagOfCollection title="-" />
                )}
              </Flex>
            </Box>

            <Box>
              <Heading
                as="h3"
                color="shader.a.700"
                fontWeight="normal"
                fontSize="md"
              >
                Pool:&nbsp;
                <Text as="span" color="shader.a.900" fontWeight="medium">
                  {collection.getGamesOfCollection.length}
                </Text>
              </Heading>

              <Flex py={2} gap={2} overflowX="auto">
                {collection.getGamesOfCollection.length ? (
                  [...Array(collection.getGamesOfCollection.length)].map(
                    (_, index) => (
                      <TagOfCollection key={index} title={String(index)} />
                    )
                  )
                ) : (
                  <TagOfCollection title="-" />
                )}
              </Flex>
            </Box>
          </Stack>
        </Box>
      ))}
    </Grid>
  );
}
