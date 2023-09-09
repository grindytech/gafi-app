import useMetaCollection from 'hooks/useMetaCollection';
import { TabsNFTDataProps } from '.';
import TabsEmptyData from '../TabsEmptyData';
import useMetaNFT from 'hooks/useMetaNFT';
import useItemBalanceOf from 'hooks/useItemBalanceOf';
import { Box, Center, Flex, Stack, Text } from '@chakra-ui/react';
import RatioPicture from 'components/RatioPicture';
import { cloundinary_link } from 'axios/cloudinary_axios';

interface TabsNFTPanelProps {
  meta?: TabsNFTDataProps[] | undefined;
}

export default ({ meta }: TabsNFTPanelProps) => {
  return (
    <>
      {meta?.length ? <TabsNFTPanelService meta={meta} /> : <TabsEmptyData />}
    </>
  );
};

function TabsNFTPanelService({ meta }: { meta: TabsNFTDataProps[] }) {
  const { MetaCollection } = useMetaCollection({
    key: `creator_tab_nft`,
    filter: 'collection_id',
    arg: meta.map(({ collection_id }) => collection_id),
  });

  const { metaNFT } = useMetaNFT({
    key: `creator_tab_nft`,
    filter: 'collection_id',
    arg: meta.map(({ collection_id, nft_id }) => ({
      collection_id,
      nft_id,
    })),
  });

  const { itemBalanceOf } = useItemBalanceOf({
    key: `creator_tab_nft`,
    filter: 'address',
    arg: meta.map(({ owner }) => owner),
  });

  return (
    <>
      {meta.map(({ collection_id, nft_id, infinity }) => {
        const currentMetaCollection = MetaCollection?.find(
          meta => meta?.collection_id === collection_id
        );

        const currentMetaNFT = metaNFT?.find(
          meta =>
            meta?.collection_id === collection_id && meta?.nft_id === nft_id
        );

        const currentItemOfBalance = itemBalanceOf?.find(
          meta =>
            meta?.collection_id === collection_id && meta?.nft_id === nft_id
        );

        return (
          <Box
            key={`${collection_id}/${nft_id}`}
            fontWeight="medium"
            bg="shader.a.900"
            borderRadius="xl"
          >
            <RatioPicture
              src={
                currentMetaNFT?.avatar
                  ? cloundinary_link(currentMetaNFT.avatar)
                  : null
              }
            />

            <Stack padding={4}>
              <Text fontSize="sm" color="primary.a.300">
                {currentMetaCollection?.title}
              </Text>

              <Flex gap={4} justifyContent="space-between">
                <Text as="strong" color="white" wordBreak="break-word">
                  {currentMetaNFT?.title}
                </Text>

                <Text color="shader.a.500" fontSize="sm">
                  ID:&nbsp;
                  <Text as="span" color="white">
                    {nft_id}
                  </Text>
                </Text>
              </Flex>

              <Center justifyContent="space-between">
                <Text fontSize="sm" color="primary.a.300">
                  {infinity ? 'Infinity' : 'x' + currentItemOfBalance?.amount}
                </Text>

                <Text color="shader.a.500" fontWeight="normal" fontSize="xs">
                  Edit 43m ago
                </Text>
              </Center>
            </Stack>
          </Box>
        );
      })}
    </>
  );
}
