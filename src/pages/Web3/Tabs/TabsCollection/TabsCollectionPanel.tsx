import {
  Box,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react';

import AvatarPopover from 'components/Avatar/AvatarPopover';
import RatioPicture from 'components/RatioPicture';
import TabsEmptyData from '../TabsEmptyData';
import useMetaCollection from 'hooks/useMetaCollection';
import { TabsCollectionDataProps } from '.';
import { cloundinary_link } from 'axios/cloudinary_axios';
import { convertHex } from 'utils/utils';
import { colors } from 'theme/theme';
import AvatarJazzicon from 'components/Avatar/AvatarJazzicon';

interface TabsCollectionPanelProps {
  meta: TabsCollectionDataProps[] | undefined;
}

export default ({ meta }: TabsCollectionPanelProps) => {
  return (
    <>
      {meta?.length ? (
        <TabsCollectionPanelService meta={meta} />
      ) : (
        <TabsEmptyData />
      )}
    </>
  );
};

function TabsCollectionPanelService({
  meta,
}: {
  meta: TabsCollectionDataProps[];
}) {
  const { MetaCollection } = useMetaCollection({
    key: `web3_tab_collection`,
    filter: 'collection_id',
    arg: meta.map(({ collection_id }) => collection_id),
  });

  return (
    <>
      {meta.map(({ collection_id, game, owner, role, items }) => {
        const currentMetaCollection = MetaCollection?.find(
          data => data?.collection_id === collection_id
        );

        return (
          <Box
            key={collection_id}
            fontWeight="medium"
            bg="shader.a.900"
            borderRadius="xl"
          >
            <Box position="relative">
              <RatioPicture
                src={
                  currentMetaCollection?.image
                    ? cloundinary_link(currentMetaCollection.image)
                    : null
                }
              />

              <Flex position="absolute" bottom={0} margin={3}>
                <AvatarPopover type="Owner" address={owner} name="-">
                  <AvatarJazzicon
                    address={owner}
                    sx={{ width: '100%', height: '100%' }}
                  />
                </AvatarPopover>

                <AvatarPopover type="Admin" address={role} name="-">
                  <AvatarJazzicon
                    address={role}
                    sx={{ width: '100%', height: '100%' }}
                  />
                </AvatarPopover>
              </Flex>
            </Box>

            <Stack padding={4}>
              <Center justifyContent="space-between">
                <Text as="strong" color="white">
                  {currentMetaCollection?.title || '-'}
                </Text>

                <Text color="shader.a.500" fontSize="sm">
                  ID:&nbsp;
                  <Text as="span" color="white">
                    {collection_id}
                  </Text>
                </Text>
              </Center>

              <Center justifyContent="space-between">
                <Text fontSize="sm" color="shader.a.400">
                  Joined games
                </Text>

                <Menu placement="top-start">
                  <MenuButton
                    fontSize="xs"
                    bg={
                      game.length
                        ? convertHex(colors.primary.a[200], 0.15)
                        : 'shader.a.800'
                    }
                    color={game.length ? 'primary.a.200' : 'shader.a.400'}
                    borderRadius="2xl"
                    px={2}
                    py={1}
                  >
                    + {game.length} games
                  </MenuButton>

                  {game.length ? (
                    <MenuList
                      minWidth="auto"
                      padding={4}
                      borderRadius="lg"
                      borderColor="shader.a.800"
                      bg="shader.a.900"
                      fontWeight="medium"
                      color="shader.a.500"
                    >
                      <Text color="primary.a.300" fontSize="sm" mb={4}>
                        Joined games
                      </Text>

                      {game.map(meta => (
                        <MenuItem
                          key={meta}
                          bg="transparent"
                          display="flex"
                          gap={3}
                          padding={2}
                          borderRadius="lg"
                          _hover={{
                            bg: convertHex(colors.shader.a[800], 0.65),
                          }}
                        >
                          <RatioPicture
                            src={`https://picsum.photos/id/${Math.round(
                              Math.random() * 50
                            )}/200/300`}
                            sx={{ width: 10, height: 10 }}
                          />

                          <Box pr={32}>
                            <Text color="white">
                              {Math.random().toString(36).slice(2, 10)}
                            </Text>

                            <Text as="span" fontWeight="normal" fontSize="sm">
                              ID: {meta}
                            </Text>
                          </Box>
                        </MenuItem>
                      ))}
                    </MenuList>
                  ) : null}
                </Menu>
              </Center>

              <Center justifyContent="space-between">
                <Text color="primary.a.300" fontSize="sm">
                  {items} items
                </Text>

                <Text
                  as="span"
                  fontSize="xs"
                  fontWeight="normal"
                  color="shader.a.500"
                >
                  Edit 2 weeks ago
                </Text>
              </Center>
            </Stack>
          </Box>
        );
      })}
    </>
  );
}
