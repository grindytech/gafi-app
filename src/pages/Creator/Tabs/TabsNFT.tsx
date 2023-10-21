import { Box, Center, Flex, Grid, Stack, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import swaggerAxios from 'axios/swagger.axios';
import RatioPicture from 'components/RatioPicture';
import { formatDistance } from 'date-fns';
import TabsName from './TabsName';
import { TabsArgumentProps } from '..';
import TabsEmptyData from './TabsEmptyData';
import { useAccountContext } from 'contexts/contexts.account';
import { TypeSwaggerSearchCollectionData } from 'types/swagger.type';
import getQueryClient from 'utils/utils.queryClient';

export default ({ type, setLoading }: TabsArgumentProps) => {
  const { account } = useAccountContext();

  const getCollection = getQueryClient.getQueryData([
    `Creator_TabCollections/${account.current?.address || 'none'}`,
  ]) as Partial<TypeSwaggerSearchCollectionData> | undefined;

  const { data } = useQuery({
    queryKey: [
      `Creator_TabNFTs/${account.current?.address || 'none'}`,
      getCollection?.data?.length,
    ],
    queryFn: async () => {
      if (getCollection?.data?.length) {
        return Promise.all(
          getCollection.data.map(async ({ collection_id, name }) => {
            const service = await swaggerAxios.nftSearch({
              body: {
                query: {
                  collection_id: collection_id as any,
                },
              },
            });

            return service.data.map(meta => ({
              ...meta,
              collection: {
                name,
              },
            }));
          })
        ).then(data => data.filter(meta => !!meta?.length).flat());
      }

      return [];
    },
    onSuccess(data) {
      if (setLoading) {
        setLoading(prev => ({
          ...prev,
          nft: { isLoading: false, data: data?.length },
        }));
      }
    },
    onError() {
      if (setLoading) {
        setLoading(prev => ({
          ...prev,
          nft: { isLoading: false, data: undefined },
        }));
      }
    },
  });

  return (
    <>
      {type === 'tab' && <TabsName name="NFT" amount={data?.length} />}

      {type === 'panel' ? (
        data?.length ? (
          <Grid
            gap={5}
            gridTemplateColumns={{
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
              xl: 'repeat(4, 1fr)',
            }}
          >
            {data.map(meta => (
              <Box
                key={meta.id}
                fontWeight="medium"
                bg="shader.a.900"
                borderRadius="xl"
              >
                <RatioPicture src={meta.image || null} />

                <Stack padding={4}>
                  <Text fontSize="sm" color="primary.a.300">
                    {meta.collection.name}
                  </Text>

                  <Flex gap={4} justifyContent="space-between">
                    <Text as="strong" color="white" wordBreak="break-word">
                      {meta.name}
                    </Text>

                    <Text color="shader.a.500" fontSize="sm">
                      ID:&nbsp;
                      <Text as="span" color="white">
                        {meta.token_id}
                      </Text>
                    </Text>
                  </Flex>

                  <Center justifyContent="space-between">
                    <Text fontSize="sm" color="primary.a.300">
                      {meta?.supply || 'Infinity'}
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
