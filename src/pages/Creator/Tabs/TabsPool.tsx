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

import RatioPicture from 'components/RatioPicture';
import AvatarPopover from 'components/Avatar/AvatarPopover';
import AvatarJazzicon from 'components/Avatar/AvatarJazzicon';
import { convertHex } from 'utils';
import DateBlock from 'components/DateBlock';

import { colors } from 'theme/theme';

import swaggerAxios from 'axios/swagger.axios';
import { useQuery } from '@tanstack/react-query';
import TabsName from './TabsName';
import { TabsArgumentProps } from '..';
import TabsEmptyData from './TabsEmptyData';
import { useAccountContext } from 'contexts/contexts.account';
import { TypeSwaggerPoolData } from 'types/swagger.type';

export default ({ type, setLoading }: TabsArgumentProps) => {
  const { account } = useAccountContext();

  const { data } = useQuery({
    queryKey: [`Creator_TabPools/${account.current?.address || 'none'}`],
    queryFn: async () => {
      if (account.current?.address) {
        return await swaggerAxios.poolSearch({
          body: {
            query: {
              owner: account.current.address,
            },
          },
        });
      }

      return [] as Partial<TypeSwaggerPoolData>;
    },
    onSuccess(data) {
      if (setLoading) {
        setLoading(prev => ({
          ...prev,
          pool: { isLoading: false, data: data?.data?.length },
        }));
      }
    },
    onError() {
      if (setLoading) {
        setLoading(prev => ({
          ...prev,
          pool: { isLoading: false, data: undefined },
        }));
      }
    },
  });

  return (
    <>
      {type === 'tab' && <TabsName name="Pool" amount={data?.data?.length} />}

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
                key={meta.pool_id}
                fontWeight="medium"
                bg="shader.a.900"
                borderRadius="xl"
              >
                <Box position="relative">
                  <RatioPicture src={null} />

                  <Flex position="absolute" bottom={0} margin={3}>
                    <AvatarPopover type="Owner" address={meta.owner} name="-">
                      <AvatarJazzicon value={meta.owner} />
                    </AvatarPopover>

                    <AvatarPopover
                      type="Admin"
                      address={'coming soon'}
                      name="-"
                    >
                      <AvatarJazzicon value={'coming soon'} />
                    </AvatarPopover>
                  </Flex>
                </Box>

                <Stack padding={4}>
                  <Flex gap={4} justifyContent="space-between">
                    <Text as="strong" color="white" wordBreak="break-word">
                      name
                    </Text>

                    <Text color="shader.a.500" fontSize="sm">
                      ID:&nbsp;
                      <Text as="span" color="white">
                        {meta.pool_id}
                      </Text>
                    </Text>
                  </Flex>

                  <Center justifyContent="space-between">
                    <Text fontSize="sm" color="shader.a.400">
                      Supply
                    </Text>

                    <Menu placement="top-start">
                      <MenuButton
                        fontSize="xs"
                        bg={
                          meta.loot_table?.length
                            ? convertHex(colors.primary.a[200], 0.15)
                            : 'shader.a.800'
                        }
                        color={
                          meta.loot_table?.length
                            ? 'primary.a.200'
                            : 'shader.a.400'
                        }
                        borderRadius="2xl"
                        px={2}
                        py={1}
                        onClick={() => alert('coming soon')}
                      >
                        + {meta.loot_table?.length} items
                      </MenuButton>
                    </Menu>
                  </Center>

                  <Text fontWeight="normal" fontSize="xs" color="shader.a.400">
                    End in:&nbsp;
                    <DateBlock
                      endBlock={meta.end_at || -1}
                      end={meta.end_at ? 'Expired' : 'Infinity'}
                      sx={{
                        as: 'span',
                        color: 'white',
                        fontWeight: 'medium',
                      }}
                    />
                  </Text>
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
