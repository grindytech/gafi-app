import { Box, Center, Flex, Grid, Text } from '@chakra-ui/react';
import { cloundinary_link } from 'axios/cloudinary_axios';
import RatioPicture from 'components/RatioPicture';
import { PropsWithChildren } from 'react';

interface PoolsConfigModalOuter extends PropsWithChildren {
  image: string | undefined;
  name: string | undefined;
  id: number | string;
  length: number;
}

export default ({
  id,
  image,
  name,
  length,
  children,
}: PoolsConfigModalOuter) => {
  return (
    <Box
      overflow="auto"
      padding={4}
      _notFirst={{
        borderTop: '0.0625rem solid',
        borderColor: 'shader.a.900',
      }}
    >
      <Center justifyContent="space-between">
        <Flex gap={2}>
          <Box height={10} width={10}>
            <RatioPicture
              src={image ? cloundinary_link(image) : null}
              sx={{ height: 'full', width: 'full' }}
            />
          </Box>

          <Box>
            <Text fontSize="xs" color="shader.a.400">
              {name}
            </Text>
            <Text fontSize="sm" color="white" fontWeight="medium">
              ID: {id}
            </Text>
          </Box>
        </Flex>

        <Text color="primary.a.300" fontSize="sm" fontWeight="medium">
          {length} Items
        </Text>
      </Center>

      <Grid
        flexWrap="wrap"
        gridTemplateColumns={{
          base: 'repeat(4, 11.5rem)',
          md: 'repeat(4, 1fr)',
        }}
        mt={4}
        gap={3}
      >
        {children}
      </Grid>
    </Box>
  );
};
