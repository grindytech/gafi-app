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
import useMetaGame from 'hooks/useMetaGame';

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
    key: `creator_tab_collection`,
    filter: 'collection_id',
    arg: meta.map(({ collection_id }) => collection_id),
  });

  const { MetaGame } = useMetaGame({
    key: `creator_tab_collection`,
    filter: `game_id`,
    arg: meta
      .filter(({ game }) => game.length)
      .map(meta => meta.game)
      .flat(),
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
                  currentMetaCollection?.avatar
                    ? cloundinary_link(currentMetaCollection.avatar)
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

                      {game.map(game_id => {
                        const currentMetaGame = MetaGame?.find(
                          meta => meta.game_id === game_id
                        );

                        return (
                          <MenuItem
                            key={game_id}
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
                              src={
                                currentMetaGame?.avatar
                                  ? cloundinary_link(currentMetaGame.avatar)
                                  : null
                              }
                              sx={{ width: 10, height: 10 }}
                            />

                            <Box pr={32}>
                              <Text color="white">
                                {currentMetaGame?.title}
                              </Text>

                              <Text as="span" fontWeight="normal" fontSize="sm">
                                ID: {game_id}
                              </Text>
                            </Box>
                          </MenuItem>
                        );
                      })}
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
