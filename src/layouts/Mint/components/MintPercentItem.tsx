import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React, { useEffect } from 'react';

export default function MintPercentItem({ getValues, watch }) {
  const { collection_id, amount } = getValues();
  const ListItem = [
    {
      item: 0,
      amount: 1300,
      rare: 50,
    },
    {
      item: 1,
      amount: 700,
      rare: 20,
    },
    {
      item: 2,
      amount: 80,
      rare: 10,
    },
  ];
  useEffect(() => {
    // console.log(watch());
  }, [collection_id, amount]);

  return (
    <>
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
              <Text>
                Amount&nbsp;
                <Text as="span" color="shader.a.900" fontWeight="semibold">
                  {mint.amount}
                </Text>
              </Text>

              <Text>
                Rare&nbsp;
                <Text as="span" color="primary.a.500" fontWeight="semibold">
                  {mint.rare}%
                </Text>
              </Text>
            </Box>
          ))}
        </Grid>
      </CardBox>
    </>
  );
}
