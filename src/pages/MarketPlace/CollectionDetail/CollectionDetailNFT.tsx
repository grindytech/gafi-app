import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  HStack,
  Heading,
  Icon,
  Image,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { testOption1, testOption2, testOptionSort } from 'hooks/DataTest';
import FilterIcon from 'public/assets/line/filter.svg';

import MarketPlaceFilter from 'components/MarketPlaceFilter';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from 'hooks/useRedux';
import React from 'react';
import { cloundinary_link } from 'axios/cloudinary_axios';
import { Link } from 'react-router-dom';

import useMetaNFT from 'hooks/useMetaNFT';

export default function CollectionDetailNFT() {
  const { collection_id } = useParams();
  const { api } = useAppSelector(state => state.substrate);

  const { isOpen, onToggle } = useDisclosure();

  const { data } = useQuery({
    queryKey: [`collection_nft/${collection_id}`],
    queryFn: async () => {
      if (api) {
        const service = (await api.query.nfts.item.entries(collection_id)).map(
          ([
            {
              args: [collection, item],
            },
          ]) => {
            return {
              item_id: item.toNumber(),
              collection_id: collection.toNumber(),
            };
          }
        );

        return service;
      }
    },
  });

  const { metaNFT } = useMetaNFT({
    key: collection_id,
    group: data?.map(item => ({
      collection_id: item.collection_id,
      nft_id: item.item_id,
    })),
  });

  return (
    <>
      {data && data.length ? (
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
                data.map((item, index) => (
                  <Box
                    key={item.item_id}
                    as={Link}
                    to={`/marketplace/nft/${item.item_id}/${item.collection_id}`}
                    border="0.0625rem solid"
                    borderColor="shader.a.300"
                    bg="white"
                    borderRadius="xl"
                  >
                    <Box
                      padding={2}
                      borderBottom="0.0625rem solid"
                      borderColor="shader.a.200"
                    >
                      <Center
                        borderRadius="xl"
                        bg="shader.a.300"
                        position="relative"
                        overflow="hidden"
                        aspectRatio={16 / 9}
                        sx={{
                          img: {
                            position: 'absolute',
                            inset: 0,
                            width: 'full',
                            height: 'full',
                          },
                        }}
                      >
                        {metaNFT?.[index]?.image ? (
                          <Image
                            objectFit="cover"
                            alt="image is outdated"
                            src={`${cloundinary_link}/${metaNFT[index]?.image}`}
                          />
                        ) : (
                          <Image src="/assets/fill/item.png" objectFit="none" />
                        )}
                      </Center>
                    </Box>

                    <Box padding={4}>
                      <Center justifyContent="space-between">
                        <Heading
                          fontSize="sm"
                          fontWeight="medium"
                          color="shader.a.900"
                        >
                          Collection ID
                        </Heading>

                        <Text>{item.collection_id}</Text>
                      </Center>

                      <Center justifyContent="space-between">
                        <Heading className="card-value" fontSize="md!">
                          {metaNFT?.[index]?.title || '-'}
                        </Heading>

                        <Text className="card-value" color="shader.a.500!">
                          ID:&nbsp;
                          <Text as="span" color="primary.a.500">
                            {item.item_id}
                          </Text>
                        </Text>
                      </Center>
                    </Box>
                  </Box>
                ))
              )}
            </Grid>
          </Flex>
        </Box>
      ) : null}
    </>
  );
}
