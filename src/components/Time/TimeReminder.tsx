import TimeIcon from 'public/assets/line/time.svg';
import { Box, Text, HStack, Icon, BoxProps } from '@chakra-ui/react';

const TimeReminder = (sx: BoxProps) => {
  return (
    <>
      <Box
        background="rgba(0, 0, 0, 0.70)"
        borderRadius="1.125rem"
        backdropFilter="blur(5px)"
        bottom={3}
        left={3}
        {...sx}
      >
        <HStack py={1.5} px={2} color="white" gap={0.5} fontSize="sm">
          <Icon as={TimeIcon} h={5} w={5} />
          <Text>End in </Text>
          <Text fontWeight="medium">0h 32m 13s</Text>
        </HStack>
      </Box>
    </>
  );
};

export default TimeReminder;
