import {
  Box,
  Center,
  CircularProgress,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { cloundinary_link } from 'axios/cloudinary_axios';
import CardBox from 'components/CardBox';

import { useAppSelector } from 'hooks/useRedux';
import React from 'react';
import { TypeMetadataOfItem } from 'types';

import { CalculatorOfRarity, ColorOfRarity, formatGAFI } from 'utils/utils';

type TypeMaybeNFT = {
  collection: number;
  item: number;
};

interface MintWeightProps {
  pool_id: string;
}

export default function MintWeight({ pool_id }: MintWeightProps) {
  const { api } = useAppSelector(state => state.substrate);

  const { data, isLoading, isError } = useQuery(
    ['getItemsOfPoolID', pool_id],
    async () => {
      if (api && api.query.game) {
        const res = await api.query.game.lootTableOf(pool_id);

        return Promise.all(
          res.map(async ([maybeNft, weight]) => {
            const getWeight = weight[1].toPrimitive() as number;
            const poolOf = (await api.query.game.poolOf(pool_id)).toHuman() as {
              mintSettings: {
                startBlock: number;
                endBlock: number;
                price: string;
                mintType: string;
              };
            };

            if (maybeNft[1].isEmpty) {
              return {
                rarity: getWeight,
                metadataOfPool: poolOf.mintSettings,
              };
            }

            const { collection, item } = maybeNft[1].toJSON() as TypeMaybeNFT;

            const supplyOfItem = await api.query.game.supplyOf(
              collection,
              item
            );

            const metadataOfCollection = (await api.query.nfts
              .itemMetadataOf(collection, item)
              .then(item => {
                const data = item.value.toHuman();

                if (data) {
                  return JSON.parse(String(data.data));
                }
              })) as TypeMetadataOfItem;

            return {
              item_id: item,
              collection_id: collection,
              rarity: getWeight,
              supply: supplyOfItem.toHuman(),
              metadataOfCollection,
              metadataOfPool: poolOf.mintSettings,
            };
          })
        );
      }
    },
    {
      enabled: !!(api && api.query.game),
    }
  );

  console.log(data);

  if (!pool_id) return undefined;

  if (isError || !data?.length)
    return (
      <CardBox variant="createGames" as={Center} py={4}>
        Not Found
      </CardBox>
    );

  if (isLoading)
    return (
      <Center py={4}>
        <CircularProgress isIndeterminate color="primary.a.500" />
      </Center>
    );

  return (
    <>
      {data && data.length ? (
        <CardBox variant="createGames">
          <SimpleGrid
            columns={{
              sm: 2,
              md: 3,
            }}
            mt={3}
            gap={3}
          >
            {React.Children.toArray(
              data.map(item => {
                const rarity = CalculatorOfRarity(
                  item.rarity,
                  data.map(item => item.rarity)
                );

                return (
                  <Flex
                    flexDirection="column"
                    justifyContent="space-between"
                    border="0.0625rem solid"
                    borderColor="shader.a.400"
                    borderRadius="xl"
                  >
                    <Center height={32} bg="shader.a.300" position="relative">
                      {item.metadataOfCollection?.image ? (
                        <Image
                          width="full"
                          height="full"
                          objectFit="cover"
                          alt="image is outdated"
                          src={`${cloundinary_link}/${item.metadataOfCollection.image}`}
                        />
                      ) : (
                        <Image src={'public/assets/fill/item.png'} />
                      )}
                    </Center>

                    <Box padding={4}>
                      <Center justifyContent="space-between">
                        <Heading
                          fontSize="lg"
                          fontWeight="medium"
                          color="shader.a.900"
                        >
                          {item.metadataOfCollection?.title || '-'}
                        </Heading>

                        {typeof item.item_id === 'number' ? (
                          <Text>
                            ID:&nbsp;
                            <Text as="span" color="primary.a.500">
                              {item.item_id}
                            </Text>
                          </Text>
                        ) : null}
                      </Center>

                      <Box mt={4}>
                        {item.supply ? (
                          <Text>
                            Supply:&nbsp;
                            <Text as="span" color="primary.a.500">
                              {String(item.supply)}
                            </Text>
                          </Text>
                        ) : null}

                        {typeof item.collection_id === 'number' ? (
                          <Text>
                            Collection ID:&nbsp;
                            <Text as="span" color="primary.a.500">
                              {item.collection_id}
                            </Text>
                          </Text>
                        ) : null}

                        <Text>
                          Rarity:&nbsp;
                          <Text
                            as="span"
                            color={ColorOfRarity(rarity)}
                            fontWeight="semibold"
                          >
                            {rarity}%
                          </Text>
                        </Text>

                        <Text>
                          Price:&nbsp;
                          <Text as="span" color="primary.a.500">
                            {formatGAFI(
                              item.metadataOfPool.price.replaceAll(',', '')
                            )}
                          </Text>
                        </Text>

                        <Text>
                          Type:&nbsp;
                          <Text as="span" color="primary.a.500">
                            {item.metadataOfPool.mintType}
                          </Text>
                        </Text>

                        <Text>
                          Start Block:&nbsp;
                          <Text as="span" color="primary.a.500">
                            {item.metadataOfPool.startBlock || 'Infinity'}
                          </Text>
                        </Text>

                        <Text>
                          End Block:&nbsp;
                          <Text as="span" color="primary.a.500">
                            {item.metadataOfPool.endBlock || 'Infinity'}
                          </Text>
                        </Text>
                      </Box>
                    </Box>
                  </Flex>
                );
              })
            )}
          </SimpleGrid>
        </CardBox>
      ) : null}
    </>
  );
}
