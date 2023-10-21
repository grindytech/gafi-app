import {
  Box,
  Center,
  Flex,
  Grid,
  Menu,
  MenuButton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import swaggerAxios from 'axios/swagger.axios';
import AvatarJazzicon from 'components/Avatar/AvatarJazzicon';
import AvatarPopover from 'components/Avatar/AvatarPopover';
import RatioPicture from 'components/RatioPicture';
import { formatDistance } from 'date-fns';
import { colors } from 'theme/theme';
import { convertHex } from 'utils';
import TabsName from './TabsName';
import { TabsArgumentProps } from '..';
import TabsEmptyData from './TabsEmptyData';
import { useAccountContext } from 'contexts/contexts.account';
import { TypeSwaggerSearchCollectionData } from 'types/swagger.type';

export default ({ type, setLoading }: TabsArgumentProps) => {
  const { account } = useAccountContext();

  const { data } = useQuery({
    queryKey: [`Creator_TabCollections/${account.current?.address || 'none'}`],

    queryFn: async () => {
      if (account.current?.address) {
        return swaggerAxios.collectionSearch({
          body: {
            query: {
              owner: account.current.address,
            },
          },
        });
      }

      return [] as Partial<TypeSwaggerSearchCollectionData>;
    },
    onSuccess(data) {
      if (setLoading) {
        setLoading(prev => ({
          ...prev,
          collection: { isLoading: false, data: data?.data?.length },
        }));
      }
    },
    onError() {
      if (setLoading) {
        setLoading(prev => ({
          ...prev,
          collection: { isLoading: false, data: undefined },
        }));
      }
    },
  });

  return (
    <>
      {type === 'tab' && (
        <TabsName name="Collection" amount={data?.data?.length} />
      )}

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
                key={meta.collection_id}
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
                </Box>

                <Stack padding={4}>
                  <Flex gap={4} justifyContent="space-between">
                    <Text as="strong" color="white" wordBreak="break-word">
                      {meta.name}
                    </Text>

                    <Text color="shader.a.500" fontSize="sm">
                      ID:&nbsp;
                      <Text as="span" color="white">
                        {meta.collection_id}
                      </Text>
                    </Text>
                  </Flex>

                  <Center justifyContent="space-between">
                    <Text fontSize="sm" color="shader.a.400">
                      Joined games
                    </Text>

                    <Menu placement="top-start">
                      <MenuButton
                        fontSize="xs"
                        bg={
                          meta.games?.length
                            ? convertHex(colors.primary.a[200], 0.15)
                            : 'shader.a.800'
                        }
                        color={
                          meta.games?.length ? 'primary.a.200' : 'shader.a.400'
                        }
                        onClick={() => alert('coming soon')}
                        borderRadius="2xl"
                        px={2}
                        py={1}
                      >
                        + {meta.games?.length || 0} games
                      </MenuButton>

                      {/* {meta.games?.length ? (
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
                                  {currentMetaGame?.title || 'unknown'}
                                </Text>

                                <Text
                                  as="span"
                                  fontWeight="normal"
                                  fontSize="sm"
                                >
                                  ID: {game_id}
                                </Text>
                              </Box>
                            </MenuItem>
                          );
                        })}
                      </MenuList>
                    ) : null} */}
                    </Menu>
                  </Center>

                  <Center justifyContent="space-between">
                    <Text color="primary.a.300" fontSize="sm">
                      0 items
                    </Text>

                    <Text
                      as="span"
                      fontSize="xs"
                      fontWeight="normal"
                      color="shader.a.500"
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
