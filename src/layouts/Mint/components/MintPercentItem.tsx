import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React from 'react';
import { FieldValues, UseFormWatch } from 'react-hook-form';
import { colors } from 'theme/theme';

interface MintPercentItemProps {
  watch: UseFormWatch<FieldValues>;
}

export default function MintPercentItem({ watch }: MintPercentItemProps) {
  const pool_id = watch('pool_id');
  const amount = watch('amount');

  const ListItem = [
    {
      item: 0,
      amount: 1300,
      rare: 50,
    },
    {
      item: 1,
      amount: 700,
      rare: 25,
    },
    {
      item: 2,
      amount: 80,
      rare: 10,
    },
  ];

  const PercentColor = (percent: number) => {
    if (percent >= 50) return colors.primary.a[500];
    if (percent >= 25) return colors.second.orange;
    if (percent >= 0) return colors.second.purple;
  };

  return (
    <>
      {pool_id && amount ? (
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
            {ListItem.map(mint => (
              <Box
                key={mint.item}
                border="1px solid #D4D4D8"
                borderRadius="xl"
                padding={4}
              >
                <Heading fontSize="lg" fontWeight="medium" color="shader.a.900">
                  Item {mint.item}
                </Heading>

                <Box mt={4}>
                  <Text>
                    Amount&nbsp;
                    <Text as="span" color="shader.a.900" fontWeight="semibold">
                      {mint.amount}
                    </Text>
                  </Text>

                  <Text>
                    Rare&nbsp;
                    <Text
                      as="span"
                      color={PercentColor(mint.rare)}
                      fontWeight="semibold"
                    >
                      {mint.rare}%
                    </Text>
                  </Text>
                </Box>
              </Box>
            ))}
          </Grid>
        </CardBox>
      ) : null}
    </>
  );
}
