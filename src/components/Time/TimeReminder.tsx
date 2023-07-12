import TimeIcon from 'public/assets/line/time.svg';
import { Box, Text, HStack, Icon, BoxProps } from '@chakra-ui/react';
import { useCountdown } from 'hooks/useCountDown';

interface TimeProps {
  targetDate: number;
  sx?: BoxProps;
}

const TimeReminder = ({ targetDate, sx }: TimeProps) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  console.log('Day', days, hours, minutes, seconds);
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
          <HStack fontWeight="medium" gap={1} ml={1}>
            {days != 0 && <Text>{days}d</Text>}
            <Text>{hours}h</Text>
            <Text>{minutes}m</Text>
            <Text>{seconds}s</Text>
          </HStack>
        </HStack>
      </Box>
    </>
  );
};

export default TimeReminder;
