import { Box, Center, Grid, Skeleton, Stack } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React from 'react';

export default function TopAuctionsSkeleton() {
  return (
    <Grid gridTemplateColumns="repeat(5, 1fr)" gap={5}>
      {React.Children.toArray(
        [...Array(5)].map(() => (
          <CardBox variant="baseStyle" padding={0}>
            <Box
              padding={2}
              borderBottom="0.0625rem solid"
              borderColor="shader.a.200"
            >
              <Skeleton borderRadius="lg" height={32} />
            </Box>

            <Stack spacing={2} padding={4}>
              {React.Children.toArray(
                [...Array(3)].map(() => (
                  <Center justifyContent="space-between">
                    <Skeleton width={12} height={2} />

                    <Skeleton width={4} height={2} />
                  </Center>
                ))
              )}
            </Stack>
          </CardBox>
        ))
      )}
    </Grid>
  );
}
