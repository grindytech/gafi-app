import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import CardBox from 'components/CardBox';
import { useSubstrateState } from 'contexts/substrateContext';
import React from 'react';
import { FieldValues, UseFormWatch } from 'react-hook-form';

import { colors } from 'theme/theme';

type TypeLootTableOfProps = {
  maybeNFT: string | null;
  weight: number;
};

interface MintPercentItemProps {
  watch: UseFormWatch<FieldValues>;
}

export default function MintPercentItem({ watch }: MintPercentItemProps) {
  const pool_id: string = watch('pool_id');
  const { api } = useSubstrateState();

  const { data } = useQuery(
    ['getItemsOfPoolID'],
    async () => {
      if (api && pool_id) {
        const res = await api.query.game.lootTableOf(pool_id);

        return res.toJSON() as TypeLootTableOfProps[];
      }
    },
    {
      enabled: !!pool_id,
    }
  );

  console.log({ data, pool_id });

  const PercentColor = (percent: number) => {
    if (percent >= 50) return colors.primary.a[500];
    if (percent >= 25) return colors.second.orange;
    if (percent >= 0) return colors.second.purple;
  };

  return (
    <>
      {data && data.length && pool_id ? (
        <CardBox variant="createGames">
          <Box>
            <Heading fontWeight="medium" fontSize="sm" color="shader.a.500">
              Total items&nbsp;
              <Text as="span" color="primary.a.500">
                2,080
              </Text>
            </Heading>
          </Box>

          <Grid gridTemplateColumns="repeat(3, 1fr)" pt={3} gap={3}>
            {data.map((mint, index) => (
              <Box
                key={mint.weight}
                border="1px solid #D4D4D8"
                borderRadius="xl"
                padding={4}
              >
                <Heading fontSize="lg" fontWeight="medium" color="shader.a.900">
                  Item {index}
                </Heading>

                <Box mt={4}>
                  <Text>
                    Amount&nbsp;
                    <Text as="span" color="shader.a.900" fontWeight="semibold">
                      {mint.weight}
                    </Text>
                  </Text>

                  {/* <Text>
                    Rare&nbsp;
                    <Text
                      as="span"
                      color={PercentColor(mint.rare)}
                      fontWeight="semibold"
                    >
                      {mint.rare}%
                    </Text>
                  </Text> */}
                </Box>
              </Box>
            ))}
          </Grid>
        </CardBox>
      ) : null}
    </>
  );
}
