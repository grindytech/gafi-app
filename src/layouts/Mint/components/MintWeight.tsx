import {
  Box,
  Center,
  CircularProgress,
  Flex,
  Grid,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import CardBox from 'components/CardBox';
import { useSubstrateState } from 'contexts/substrateContext';
import React from 'react';

import { CalculatorOfRarity, ColorOfRarity } from 'utils/utils';

type TypeMaybeNFT = {
  collection: number;
  item: number;
};

interface MintWeightProps {
  pool_id: string;
}

export default function MintWeight({ pool_id }: MintWeightProps) {
  const { api } = useSubstrateState();

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

            return {
              item_id: item,
              collection_id: collection,
              rarity: getWeight,
            };
          })
        );

        return getSupplyOfItems.map(item => {
          const { collection_id, item_id, rarity } = item;

          const weight = CalculatorOfRarity(
            rarity,
            getSupplyOfItems.map(item => item.rarity)
          );

          return {
            collection_id,
            item_id,
            rarity: weight,
          };
        });
      }
    },
    {
      enabled: !!(api && api.query.game),
    }
  );

  if (!pool_id) return undefined;

  if (isError)
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
          <Grid gridTemplateColumns="repeat(3, 1fr)" gap={3}>
            {React.Children.toArray(
              data.map(item => {
                const { collection_id, item_id, rarity } = item;

                return (
                  <Flex
                    flexDirection="column"
                    justifyContent="space-between"
                    border="0.0625rem solid"
                    borderColor="shader.a.400"
                    borderRadius="xl"
                    padding={4}
                  >
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
                      {typeof collection_id === 'number' ? (
                        <Text>
                          Collection ID:&nbsp;
                          <Text as="span">{collection_id}</Text>
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
          </Grid>
        </CardBox>
      ) : null}
    </>
  );
}
