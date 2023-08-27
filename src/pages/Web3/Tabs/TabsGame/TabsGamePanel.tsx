import { Box, Center, Flex, Stack, Text } from '@chakra-ui/react';
import RatioPicture from 'components/RatioPicture';

import SelectMenu from 'components/SelectMenu';
import TabsEmptyData from '../TabsEmptyData';
import AvatarPopover from 'components/Avatar/AvatarPopover';
import AccountJazzicon from 'components/AccountJazzicon/AccountJazzicon';
import { TabsGameDataProps } from '.';

interface TabsGamePanelProps {
  meta: TabsGameDataProps[] | undefined;
}

export default ({ meta }: TabsGamePanelProps) => {
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
      {meta?.length ? (
        meta.map(meta => (
          <Box
            key={meta.game_id}
            fontWeight="medium"
            bg="shader.a.900"
            borderRadius="xl"
          >
            <Box position="relative">
              <RatioPicture
                src={`https://picsum.photos/id/${Math.round(
                  Math.random() * 50
                )}/200/300`}
                alt={`game-picture-${meta.game_id}`}
              />

              <Flex position="absolute" bottom={0} margin={3}>
                <AvatarPopover type="Owner" address={meta.owner} name="-">
                  <AccountJazzicon
                    address={meta.owner}
                    sx={{ width: '100%', height: '100%' }}
                  />
                </AvatarPopover>

                <AvatarPopover type="Admin" address={meta.role} name="-">
                  <AccountJazzicon
                    address={meta.role}
                    sx={{ width: '100%', height: '100%' }}
                  />
                </AvatarPopover>
              </Flex>

              <SelectMenu menu={menu} />
            </Box>

            <Stack padding={4}>
              <Center justifyContent="space-between">
                <Text as="strong" color="white">
                  {Math.random().toString(36).slice(2, 10)}
                </Text>

                <Text color="shader.a.300" fontSize="sm">
                  ID:&nbsp;
                  <Text as="span" color="primary.a.400">
                    0
                  </Text>
                </Text>
              </Center>

              <Center justifyContent="space-between">
                <Text fontSize="sm" color="primary.a.400">
                  {meta.collection.length} collections
                </Text>

                <Text color="shader.a.500" fontWeight="normal" fontSize="xs">
                  Open 4 days
                </Text>
              </Center>
            </Stack>
          </Box>
        ))
      ) : (
        <TabsEmptyData />
      )}
    </>
  );
};
