import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  HStack,
  Heading,
  Icon,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { testOption1, testOption2, testOptionSort } from 'hooks/DataTest';
import FilterIcon from 'public/assets/line/filter.svg';

import MarketPlaceFilter from 'components/MarketPlaceFilter';
import { useParams } from 'react-router-dom';

import React from 'react';
import { cloundinary_link } from 'axios/cloudinary_axios';
import { Link } from 'react-router-dom';

import useMetaNFT from 'hooks/useMetaNFT';
import useGetNFT, { nftsItemProps } from 'hooks/useGetNFT';
import RatioPicture from 'components/RatioPicture';

export default function CollectionDetailNFT() {
  const { collection_id } = useParams();

  const { isOpen, onToggle } = useDisclosure();

  const getNFT = useGetNFT<nftsItemProps[]>({
    key: collection_id,
    group: [Number(collection_id)],
  });

  const { metaNFT } = useMetaNFT({
    key: collection_id,
    group: getNFT?.map(item => ({
      collection_id: item.collection_id,
      nft_id: item.nft_id,
    })),
  });

  return (
    <>
      {getNFT?.length ? (
        <Box
          padding={6}
          borderTop="0.0625rem solid"
          borderTopColor="shader.a.200"
        >
          <HStack gap={4} mb={4} flexWrap="wrap">
            <Button
              variant={isOpen ? 'primary' : 'baseStyle'}
              leftIcon={<Icon as={FilterIcon} />}
              onClick={onToggle}
            >
              Filter
            </Button>

            <Select variant="formFilter" width="fit-content">
              {testOption1.map(item => (
                <option key={item.value} value={item.value}>
                  {item.title}
                </option>
              ))}
            </Select>

            <Select variant="formFilter" width="fit-content">
              {testOption2.map(item => (
                <option key={item.value} value={item.value}>
                  {item.title}
                </option>
              ))}
            </Select>

            <Select variant="formFilter" width="fit-content">
              {testOptionSort.map(item => (
                <option key={item.value} value={item.value}>
                  {item.title}
                </option>
              ))}
            </Select>
          </HStack>

          <Flex gap={5}>
            {isOpen ? (
              <Box flexBasis="25%">
                <Box position="sticky" top={85} flexBasis="25%">
                  <MarketPlaceFilter isOpen={isOpen} />
                </Box>
              </Box>
            ) : null}

            <Grid
              flex={1}
              gap={4}
              gridTemplateColumns={{
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(4, 1fr)',
              }}
            >
              {React.Children.toArray(
                getNFT.map(meta => {
                  const currentNFT = metaNFT?.find(
                    item => item?.nft_id === meta.nft_id
                  );

                  return (
                    <Box
                      as={Link}
                      to={`/marketplace/nft/${meta.nft_id}/${meta.collection_id}`}
                      border="0.0625rem solid"
                      borderColor="shader.a.300"
                      bg="white"
                      borderRadius="xl"
                    >
                      <RatioPicture
                        src={
                          currentNFT?.image
                            ? cloundinary_link(currentNFT.image)
                            : null
                        }
                        alt={meta.nft_id}
                      />

                      <Box padding={4}>
                        <Center justifyContent="space-between">
                          <Heading
                            fontSize="sm"
                            fontWeight="medium"
                            color="shader.a.900"
                          >
                            Collection ID
                          </Heading>

                          <Text>{meta.collection_id}</Text>
                        </Center>

                        <Center justifyContent="space-between">
                          <Heading className="card-value" fontSize="md!">
                            {currentNFT?.title || '-'}
                          </Heading>

                          <Text className="card-value" color="shader.a.500!">
                            ID:&nbsp;
                            <Text as="span" color="primary.a.500">
                              {meta.nft_id}
                            </Text>
                          </Text>
                        </Center>
                      </Box>
                    </Box>
                  );
                })
              )}
            </Grid>
          </Flex>
        </Box>
      ) : null}
    </>
  );
}
