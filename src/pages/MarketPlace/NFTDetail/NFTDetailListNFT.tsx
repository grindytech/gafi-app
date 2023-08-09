import { Box, Center, Grid, Heading, Stack, Text } from '@chakra-ui/react';

import { cloundinary_link } from 'axios/cloudinary_axios';

import RatioPicture from 'components/RatioPicture';
import useGetNFT, { nftsItemProps } from 'hooks/useGetNFT';
import useMetaCollection from 'hooks/useMetaCollection';
import useMetaNFT from 'hooks/useMetaNFT';

import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function NFTDetailListNFT() {
  const { nft_id, collection_id } = useParams();

  const getNFT = useGetNFT<nftsItemProps[]>({
    key: collection_id,
    group: [Number(collection_id)],
  });

  const { metaCollection } = useMetaCollection({
    key: `${nft_id}/${collection_id}`,
    group: [
      {
        collection_id: Number(collection_id),
      },
    ],
  });

  const { metaNFT } = useMetaNFT({
    key: `${getNFT?.map(({ nft_id }) => nft_id)}/${collection_id}`,
    group: getNFT?.map(({ collection_id, nft_id }) => ({
      collection_id,
      nft_id,
    })),
  });

  return (
    <>
      <Heading fontSize="xl" fontWeight="semibold" color="shader.a.900" mt={10}>
        More from&nbsp;
        <Text as="span" color="primary.a.500">
          {metaCollection?.[0]?.title || '-'}
        </Text>
      </Heading>

      <Grid
        gridTemplateColumns={{
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(5, 1fr)',
        }}
        mt={5}
        gap={5}
      >
        {getNFT?.length ? (
          React.Children.toArray(
            getNFT
              .filter(meta => meta.nft_id !== Number(nft_id))
              .map(meta => {
                const currentNFT = metaNFT?.find(
                  item => item?.nft_id === meta.nft_id
                );

                return (
                  <Box
                    as={Link}
                    to={`/marketplace/nft/${meta.nft_id}/${meta.collection_id}`}
                    borderRadius="lg"
                    border="0.0625rem solid"
                    borderColor="shader.a.300"
                    boxShadow="0px 3px 14px 0px rgba(0, 0, 0, 0.05)"
                    fontSize="sm"
                    fontWeight="medium"
                  >
                    <RatioPicture
                      src={
                        currentNFT?.image
                          ? cloundinary_link(currentNFT.image)
                          : null
                      }
                      alt={meta.nft_id}
                    />

                    <Stack
                      spacing={4}
                      padding={4}
                      borderTop="0.0625rem solid"
                      borderColor="shader.a.200"
                    >
                      <Box>
                        <Heading
                          as="h6"
                          color="primary.a.500"
                          fontSize="inherit"
                          fontWeight="inherit"
                        >
                          {metaCollection?.[0]?.title || '-'}
                        </Heading>

                        <Text color="shader.a.900">
                          {currentNFT?.title || '-'}
                        </Text>
                      </Box>
                    </Stack>
                  </Box>
                );
              })
          )
        ) : (
          <Center>empty</Center>
        )}
      </Grid>
    </>
  );
}
