import React from 'react';
import { Box, HStack, Text } from '@chakra-ui/react';
const RecentEvents = () => {
  return (
    <Box
      borderRadius="xl"
      bg="white"
      border="0.063rem solid"
      borderColor="shader.a.300"
    >
      <HStack
        justifyContent="space-between"
        p={6}
        borderBottom="0.063rem solid"
        borderColor="shader.a.300"
      >
        <Text color="shader.a.900" fontWeight="medium">
          Recent events
        </Text>
        <Text color="primary.a.500">Clear all</Text>
      </HStack>
      <Box height="400px"></Box>
    </Box>
  );
};

export default RecentEvents;
