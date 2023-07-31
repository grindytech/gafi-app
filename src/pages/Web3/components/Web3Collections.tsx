import {
  Box,
  BoxProps,
  Center,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { cloundinary_link } from 'axios/cloudinary_axios';
import AccountJazzicon from 'components/AccountJazzicon/AccountJazzicon';
import AvatarPopover from 'components/Avatar/AvatarPopover';
import RatioPicture from 'components/RatioPicture';

import useMetaCollection from 'hooks/useMetaCollection';

import { colors } from 'theme/theme';

import { convertHex } from 'utils/utils';

export interface Web3CollectionsDataProps {
  owner: string;
  role: string;
  collection_id: number;
  getGamesOfCollection: number[];
}

export interface Web3CollectionsProps {
  data: Web3CollectionsDataProps[];
}

export const TagOfCollection = (props: BoxProps) => (
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

export default function Web3Collections({ data }: Web3CollectionsProps) {
  const { metaCollection } = useMetaCollection({
    key: String(data.map(({ collection_id }) => collection_id)),
    group: data.map(({ collection_id }) => ({ collection_id })),
  });

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
      {data.map(({ collection_id, getGamesOfCollection, owner, role }) => {
        const currentMeta = metaCollection?.find(
          item => item?.collection_id === collection_id
        );

        return (
          <Box
            key={collection_id}
            border="0.0625rem solid"
            borderColor="shader.a.300"
            borderRadius="xl"
            overflow="hidden"
            display="flex"
            flexDirection="column"
          >
            <RatioPicture
              src={
                currentMeta?.image ? cloundinary_link(currentMeta.image) : null
              }
              alt={collection_id}
            />

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
                  {currentMeta?.title || '-'}
                </Heading>

                <Text fontSize="sm" fontWeight="medium" color="shader.a.500">
                  ID:&nbsp;
                  <Text as="span" color="primary.a.500">
                    {collection_id}
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
                    {getGamesOfCollection.length}
                  </Text>
                </Heading>

                <Flex py={2} gap={2} overflowX="auto">
                  {getGamesOfCollection.length ? (
                    [...Array(getGamesOfCollection)].map((_, index) => (
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
                    {getGamesOfCollection.length}
                  </Text>
                </Heading>

                <Flex py={2} gap={2} overflowX="auto">
                  {getGamesOfCollection.length ? (
                    [...Array(getGamesOfCollection.length)].map((_, index) => (
                      <TagOfCollection key={index} title={String(index)} />
                    ))
                  ) : (
                    <TagOfCollection title="-" />
                  )}
                </Flex>
              </Box>
            </Stack>
          </Box>
        );
      })}
    </Grid>
  );
}
