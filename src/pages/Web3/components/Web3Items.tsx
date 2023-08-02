import { Box, Center, Grid, Heading, Text } from '@chakra-ui/react';
import { cloundinary_link } from 'axios/cloudinary_axios';
import RatioPicture from 'components/RatioPicture';
import useItemBalanceOf from 'hooks/useItemBalanceOf';
import useMetaNFT from 'hooks/useMetaNFT';
import React from 'react';

export interface Web3ItemsDataProps {
  collection_id: number;
  nft_id: number;
  owner: string;
}

interface Web3ItemsProps {
  data: Web3ItemsDataProps[];
}

export default function Web3Items({ data }: Web3ItemsProps) {
  const { metaNFT } = useMetaNFT({
    key: String(
      data.map(({ nft_id, collection_id }) => `${nft_id}/${collection_id}`)
    ),
    group: data.map(({ collection_id, nft_id }) => ({ collection_id, nft_id })),
  });

  const { getItemBalanceOf } = useItemBalanceOf({
    key: String(
      data.map(({ collection_id, nft_id }) => `${nft_id}/${collection_id}`)
    ),
    group: data.map(({ owner, collection_id, nft_id }) => ({
      collection_id,
      nft_id,
      owner,
    })),
  });

  return (
    <Grid
      gridTemplateColumns={{
        sm: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
        xl: 'repeat(4, 1fr)',
      }}
      gap={5}
      fontWeight="medium"
      sx={{
        '.card-heading': {
          fontSize: 'sm',
          fontWeight: 'normal',
          color: 'shader.a.600',
        },
        '.card-value': {
          fontSize: 'sm',
          fontWeight: 'medium',
          color: 'shader.a.900',
        },
      }}
    >
      {React.Children.toArray(
        data.map(({ collection_id, nft_id }) => {
          const currentMeta = metaNFT?.find(
            item =>
              item?.nft_id === nft_id && item.collection_id === collection_id
          );

          const currentBalance = getItemBalanceOf?.find(
            item =>
              item?.nft_id === nft_id && item.collection_id === collection_id
          );

          return (
            <Box
              border="0.0625rem solid"
              borderColor="shader.a.300"
              borderRadius="xl"
              overflow="hidden"
              display="flex"
              flexDirection="column"
            >
              <RatioPicture
                src={
                  currentMeta?.image
                    ? cloundinary_link(currentMeta.image)
                    : null
                }
                alt={nft_id}
              />

              <Box padding={4} bg="white">
                <Center justifyContent="space-between" mb={1}>
                  <Heading className="card-value" fontSize="md!">
                    {currentMeta?.title || '-'}
                  </Heading>

                  <Text className="card-value" color="shader.a.500!">
                    ID:&nbsp;
                    <Text as="span" color="primary.a.500">
                      {nft_id}
                    </Text>
                  </Text>
                </Center>

                <Center justifyContent="space-between">
                  <Heading className="card-heading">Amount</Heading>

                  <Text className="card-value">
                    {currentBalance?.amount || 'Infinity'}
                  </Text>
                </Center>

                <Center justifyContent="space-between">
                  <Heading className="card-heading">Collection ID</Heading>

                  <Text className="card-value">{collection_id}</Text>
                </Center>
              </Box>
            </Box>
          );
        })
      )}
    </Grid>
  );
}
