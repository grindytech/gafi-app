import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Text,
} from '@chakra-ui/react';
import { formatDistanceToNowStrict } from 'date-fns';

import useSubscribeSystem from 'hooks/useSubscribeSystem';
import React from 'react';

const RecentEvents = () => {
  const { event, setEvent } = useSubscribeSystem();

  return (
    <Box
      height="fit-content"
      borderRadius="xl"
      bg="white"
      border="0.0625rem solid"
      borderColor="shader.a.300"
    >
      <HStack justifyContent="space-between" padding={6}>
        <Text color="shader.a.900" fontWeight="medium">
          Recent events
        </Text>

        <Button
          variant="unstyled"
          color="primary.a.500"
          height="auto"
          minWidth="auto"
          onClick={() => setEvent([])}
        >
          Clear all
        </Button>
      </HStack>

      {!!event?.length && (
        <Accordion
          allowMultiple
          wordBreak="break-all"
          overflowY="auto"
          height={event.length >= 8 ? '50vh' : undefined}
        >
          {React.Children.toArray(
            event.map(({ eventName, eventValue, timestamp }) => (
              <AccordionItem
                _first={{ borderTop: 'unset' }}
                borderColor="shader.a.300"
                padding={4}
              >
                <Flex
                  justifyContent="space-between"
                  gap={2}
                  alignItems="flex-start"
                >
                  <Heading
                    as="h6"
                    fontSize="md"
                    fontWeight="medium"
                    color="shader.a.600"
                  >
                    {formatDistanceToNowStrict(timestamp, { addSuffix: true })}
                    &nbsp;
                    {eventName}
                  </Heading>

                  <AccordionButton width="auto" padding={0} _hover={{}}>
                    <AccordionIcon />
                  </AccordionButton>
                </Flex>

                <AccordionPanel padding={0} mt={4}>
                  {eventValue}
                </AccordionPanel>
              </AccordionItem>
            ))
          )}
        </Accordion>
      )}
    </Box>
  );
};

export default RecentEvents;
