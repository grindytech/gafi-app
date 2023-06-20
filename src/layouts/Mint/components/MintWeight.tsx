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
import { FieldValues, UseFormWatch } from 'react-hook-form';

import { colors } from 'theme/theme';

type TypeMaybeNFT = {
  collection: number;
  item: number;
};

interface MintWeightProps {
  watch: UseFormWatch<FieldValues>;
}

export default function MintWeight({ watch }: MintWeightProps) {
  const pool_id: number = watch('pool_id');

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

        const getTotalRarity = getSupplyOfItems
          .map(item => item.rarity)
          .reduce((prev, current) => prev + current);

        return getSupplyOfItems.map(item => {
          const { collection_id, item_id, rarity } = item;

          const total = `${(rarity / getTotalRarity) * 100}`;
          const [prefix, suffixed] = total.split('.');

          return {
            collection_id,
            item_id,
            rarity: suffixed ? Number(total).toFixed(1) : prefix,
          };
        });
      }
    },
    {
      enabled: !!(api && api.query.game),
    }
  );

  const PercentColor = (percent: number) => {
    if (percent >= 50) return colors.primary.a[500];
    if (percent >= 25) return colors.second.orange;
    if (percent >= 0) return colors.second.purple;
  };

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
                          color={PercentColor(Number(rarity))}
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
