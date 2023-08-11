import { Center, Grid, Skeleton, Stack } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React from 'react';

export default function TrendingCollectionLoading() {
  return (
    <Grid gridTemplateColumns="repeat(5, 1fr)" gap={5}>
      {React.Children.toArray(
        [...Array(5)].map(() => (
          <CardBox variant="baseStyle" padding={0}>
            <Center justifyContent="flex-start" padding={2} gap={2}>
              <Skeleton borderRadius="lg" width={14} height={14} />

              <Stack spacing={2}>
                {React.Children.toArray(
                  [...Array(2)].map(() => (
                    <Center justifyContent="space-between">
                      <Skeleton width={12} height={1.5} />
                    </Center>
                  ))
                )}
              </Stack>
            </Center>
          </CardBox>
        ))
      )}
    </Grid>
  );
}
