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
          <Center height={48} bg="shader.a.300" position="relative">
            {collection.metadataOfCollection?.image ? (
              <Image
                width="full"
                height="full"
                objectFit="cover"
                alt="image is outdated"
                src={`${cloundinary_link}/${collection.metadataOfCollection.image}`}
              />
            ) : (
              <Image src={'assets/fill/item.png'} />
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

              <AvatarPopover type="Admin" address={collection.admin} name="-">
                <AccountJazzicon
                  address={collection.admin}
                  sx={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </AvatarPopover>
            </Flex>

            <Center justifyContent="space-between">
              <Heading fontSize="md" fontWeight="medium" color="shader.a.900">
                {collection.metadataOfCollection?.title || '-'}
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
                  {collection.game_id.length}
                </Text>
              </Heading>

              <Flex py={2} gap={2} overflowX="auto">
                {collection.game_id.length ? (
                  [...Array(collection.game_id)].map((_, index) => (
                    <TagOfCollection key={index} title="Heroes & Empires" />
                  ))
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
                  {collection.game_id.length}
                </Text>
              </Heading>

              <Flex py={2} gap={2} overflowX="auto">
                {collection.game_id.length ? (
                  [...Array(collection.game_id.length)].map((_, index) => (
                    <TagOfCollection key={index} title={String(index)} />
                  ))
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
