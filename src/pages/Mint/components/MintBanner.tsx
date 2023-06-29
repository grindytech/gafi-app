import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import MiningIcon from 'public/assets/art/mining.svg';

export default function MintBanner() {
  return (
    <Flex
      justifyContent="space-between"
      border="0.0625rem solid"
      borderColor="shader.a.300"
      bg="shader.a.200"
      borderRadius="xl"
    >
      <Box padding={6}>
        <Heading fontSize="xl" fontWeight="bold" color="shader.a.900">
          Minning
        </Heading>

        <Text fontSize="sm" color="shader.a.600" whiteSpace="pre-line">
          {`Lorem ipsum dolor sit amet consectetur. 
        Neque velit commodo convallis`}
        </Text>
      </Box>

      <Box pr={24}>
        <MiningIcon />
      </Box>
    </Flex>
  );
}
