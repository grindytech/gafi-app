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
import { TypeMetadataOfItem } from 'types';
import React from 'react';
import { cloundinary_link } from 'axios/cloudinary_axios';
import { Link } from 'react-router-dom';
import { PalletNftsItemMetadata } from '@polkadot/types/lookup';
import { Option } from '@polkadot/types';

export default function CollectionDetailNFT() {
  const { id } = useParams();
  const { api } = useAppSelector(state => state.substrate);

  const { isOpen, onToggle } = useDisclosure();

  const { data } = useQuery({
    queryKey: [`collection_nft/${id}`],
    queryFn: async () => {
      if (api) {
        const getItem = (await api.query.nfts.item.entries(id)).map(
          async ([
            {
              args: [collection_id, item_id],
            },
          ]) => {
            const metadata = await api.query.nfts
              .itemMetadataOf(collection_id.toNumber(), item_id.toNumber())
              .then((meta): TypeMetadataOfItem | null => {
                const service = meta as Option<PalletNftsItemMetadata>;

                if (service.isSome) {
                  return JSON.parse(String(service.value.data.toHuman()));
                }

                return null;
              });

            return {
              metadata,
              item_id: item_id.toNumber(),
              collection_id: collection_id.toNumber(),
            };
          }
        );

        return Promise.all(getItem);
      }
    },
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

            <Flex flex={1} gap={4}>
              {React.Children.toArray(
                data.map(item => (
                  <Box
                    as={Link}
                    flex={1}
                    to={`/marketplace/nft/${item.item_id}/${item.collection_id}`}
                    height="fit-content"
                    key={item.item_id}
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
                        pt={(9 / 16) * 100 + '%'} // 16:9 Aspect Ratio
                        sx={{
                          img: {
                            position: 'absolute',
                            inset: 0,
                            width: 'full',
                            height: 'full',
                          },
                        }}
                      >
                        {item.metadata?.image ? (
                          <Image
                            objectFit="cover"
                            alt="image is outdated"
                            src={`${cloundinary_link}/${item.metadata.image}`}
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
                          {item.metadata?.title || '-'}
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
            </Flex>
          </Flex>

          <Grid gridTemplateColumns="repeat(2, 1fr)"></Grid>
        </Box>
      ) : null}
    </>
  );
}
