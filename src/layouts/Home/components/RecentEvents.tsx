import { Box, HStack, Text } from '@chakra-ui/react';

import useSubscribeSystem from 'hooks/useSubscribeSystem';

const RecentEvents = () => {
  const { events } = useSubscribeSystem();
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
      <Box height="25rem" overflowY="scroll">
        {events?.map(event => (
          <Box key={event.timestamp}>
            <Text>{event.eventName}</Text>
            <Text>{event.eventValue}</Text>
            <Text>{event.timestamp}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RecentEvents;
