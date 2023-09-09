import { Box, Center, Flex, Stack, Text } from '@chakra-ui/react';
import RatioPicture from 'components/RatioPicture';

import SelectMenu from 'components/SelectMenu';
import TabsEmptyData from '../TabsEmptyData';
import AvatarPopover from 'components/Avatar/AvatarPopover';

import { TabsGameDataProps } from '.';
import AvatarJazzicon from 'components/Avatar/AvatarJazzicon';
import useMetaGame from 'hooks/useMetaGame';
import { cloundinary_link } from 'axios/cloudinary_axios';

interface TabsGamePanelProps {
  meta: TabsGameDataProps[] | undefined;
}

export default ({ meta }: TabsGamePanelProps) => {
  return (
    <>
      {meta?.length ? <TabsGamesPanelService meta={meta} /> : <TabsEmptyData />}
    </>
  );
};

function TabsGamesPanelService({ meta }: { meta: TabsGameDataProps[] }) {
  const { MetaGame } = useMetaGame({
    key: `creator_tab_game`,
    filter: 'game_id',
    arg: meta.map(({ game_id }) => game_id),
  });

  const menu = [
    {
      heading: 'Select',
    },
    {
      heading: 'Edit',
    },
    {
      heading: 'Remove',
    },
    {
      heading: 'Add member',
    },
  ];

  return (
    <>
      {meta.map(({ collection, game_id, owner, role }) => {
        const currentMetaGame = MetaGame?.find(
          meta => meta.game_id === game_id
        );

        return (
          <Box
            key={game_id}
            fontWeight="medium"
            bg="shader.a.900"
            borderRadius="xl"
          >
            <Box position="relative">
              <RatioPicture
                src={
                  currentMetaGame?.avatar
                    ? cloundinary_link(currentMetaGame.avatar)
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

              <SelectMenu menu={menu} />
            </Box>

            <Stack padding={4}>
              <Flex gap={4} justifyContent="space-between">
                <Text as="strong" color="white" wordBreak="break-word">
                  {currentMetaGame?.title}
                </Text>

                <Text color="shader.a.500" fontSize="sm">
                  ID:&nbsp;
                  <Text as="span" color="white">
                    {game_id}
                  </Text>
                </Text>
              </Flex>

              <Center justifyContent="space-between">
                <Text fontSize="sm" color="primary.a.400">
                  {collection.length} collections
                </Text>

                <Text color="shader.a.500" fontWeight="normal" fontSize="xs">
                  Open 4 days
                </Text>
              </Center>
            </Stack>
          </Box>
        );
      })}
    </>
  );
}
