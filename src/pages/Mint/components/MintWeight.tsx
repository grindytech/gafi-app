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
import { TypeMetadataOfCollection } from 'types';

import { CalculatorOfRarity, ColorOfRarity } from 'utils/utils';

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

        const getSupplyOfItems = await Promise.all(
          res.map(async ([maybeNft, weight]) => {
            const getWeight = weight[1].toPrimitive() as number;

            if (maybeNft[1].isEmpty) {
              return {
                rarity: getWeight,
              };
            }

            const { collection, item } = maybeNft[1].toJSON() as TypeMaybeNFT;

            const metadataOfCollection = (await api.query.nfts
              .collectionMetadataOf(collection)
              .then(item => {
                const data = item.value.toHuman();

                if (data) {
                  return JSON.parse(String(data.data));
                }
              })) as TypeMetadataOfCollection;

            return {
              item_id: item,
              collection_id: collection,
              rarity: getWeight,
              metadataOfCollection,
            };
          })
        );

        return getSupplyOfItems.map(item => {
          const { collection_id, item_id, rarity, metadataOfCollection } = item;

          const weight = CalculatorOfRarity(
            rarity,
            getSupplyOfItems.map(item => item.rarity)
          );

          return {
            collection_id,
            item_id,
            rarity: weight,
            metadataOfCollection,
          };
        });
      }
    },
    {
      enabled: !!(api && api.query.game),
    }
  );

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
            gap={3}
          >
            {React.Children.toArray(
              data.map(item => {
                const { collection_id, item_id, rarity, metadataOfCollection } =
                  item;

                return (
                  <Flex
                    flexDirection="column"
                    justifyContent="space-between"
                    border="0.0625rem solid"
                    borderColor="shader.a.400"
                    borderRadius="xl"
                    padding={4}
                  >
                    <Image
                      margin="auto"
                      height={20}
                      objectFit="contain"
                      src={
                        metadataOfCollection?.image
                          ? `${cloundinary_link}/${metadataOfCollection.image}`
                          : 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'
                      }
                    />
                    <Heading
                      fontSize="lg"
                      fontWeight="medium"
                      color="shader.a.900"
                    >
                      {typeof item_id === 'number'
                        ? `Item: ${item_id}`
                        : 'Empty'}
                    </Heading>

                    <Box mt={4}>
                      {metadataOfCollection?.title ? (
                        <Text>
                          Name:&nbsp;
                          <Text as="span" color="primary.a.500">
                            {metadataOfCollection.title}
                          </Text>
                        </Text>
                      ) : null}

                      {metadataOfCollection?.external_url ? (
                        <Text>
                          Link:&nbsp;
                          <Text as="span" color="primary.a.500">
                            {metadataOfCollection.external_url}
                          </Text>
                        </Text>
                      ) : null}

                      {typeof collection_id === 'number' ? (
                        <Text>
                          Collection ID:&nbsp;
                          <Text as="span" color="primary.a.500">
                            {collection_id}
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
