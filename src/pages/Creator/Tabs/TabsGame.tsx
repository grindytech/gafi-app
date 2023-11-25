import { Box, Center, Flex, Grid, Stack, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import AvatarJazzicon from 'components/Avatar/AvatarJazzicon';
import AvatarPopover from 'components/Avatar/AvatarPopover';
import RatioPicture from 'components/RatioPicture';
import SelectMenu from 'components/SelectMenu';

import { formatDistance } from 'date-fns';
import TabsName from './TabsName';
import { TabsArgumentProps } from '..';
import TabsEmptyData from './TabsEmptyData';
import swaggerAxios from 'axios/swagger.axios';
import { useAccountContext } from 'contexts/contexts.account';
import { TypeSwaggerSearchGameData } from 'types/swagger.type';

export default ({ type, setLoading }: TabsArgumentProps) => {
  const { account } = useAccountContext();

  const { data } = useQuery({
    queryKey: [`Creator_TabGames/${account.current?.address || 'none'}`],
    queryFn: async () => {
      if (account.current?.address) {
        return await swaggerAxios.gameSearch({
          body: {
            query: {
              owner: account.current.address,
            },
          },
        });
      }

      return [] as Partial<TypeSwaggerSearchGameData>;
    },
    onSuccess(data) {
      if (setLoading) {
        setLoading(prev => ({
          ...prev,
          game: { isLoading: false, data: data?.data?.length },
        }));
      }
    },
    onError() {
      if (setLoading) {
        setLoading(prev => ({
          ...prev,
          game: { isLoading: false, data: undefined },
        }));
      }
    },
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
      {type === 'tab' && <TabsName name="Game" amount={data?.data?.length} />}

      {type === 'panel' ? (
        data?.data?.length ? (
          <Grid
            gap={5}
            gridTemplateColumns={{
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
              xl: 'repeat(4, 1fr)',
            }}
          >
            {data.data.map(meta => (
              <Box
                key={meta.game_id}
                fontWeight="medium"
                bg="shader.a.900"
                borderRadius="xl"
              >
                <Box position="relative">
                  <RatioPicture src={meta.logo || null} />

                  <Flex position="absolute" bottom={0} margin={3}>
                    <AvatarPopover type="Owner" address={meta.owner} name="-">
                      <AvatarJazzicon value={meta.owner} size={32} />
                    </AvatarPopover>

                    <AvatarPopover
                      type="Admin"
                      address={'coming soon'}
                      name="-"
                    >
                      <AvatarJazzicon value={'coming soon'} size={32} />
                    </AvatarPopover>
                  </Flex>

                  <SelectMenu menu={menu} />
                </Box>

                <Stack padding={4}>
                  <Flex gap={4} justifyContent="space-between">
                    <Text as="strong" color="white" wordBreak="break-word">
                      {meta.name}
                    </Text>

                    <Text color="shader.a.500" fontSize="sm">
                      ID:&nbsp;
                      <Text as="span" color="white">
                        {meta.game_id}
                      </Text>
                    </Text>
                  </Flex>

                  <Center justifyContent="space-between">
                    <Text fontSize="sm" color="primary.a.400">
                      {meta.collections?.length || 0} collections
                    </Text>

                    <Text
                      color="shader.a.500"
                      fontWeight="normal"
                      fontSize="xs"
                    >
                      Open&nbsp;
                      {formatDistance(meta.updated_at, new Date(), {
                        addSuffix: true,
                      })}
                    </Text>
                  </Center>
                </Stack>
              </Box>
            ))}
          </Grid>
        ) : (
          <TabsEmptyData />
        )
      ) : null}
    </>
  );
};
