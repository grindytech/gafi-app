import React from 'react';
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
  Text,
} from '@chakra-ui/react';
import { formatDistanceToNowStrict } from 'date-fns';

import useSubscribeSystem from 'hooks/useSubscribeSystem';

export default function HomeRecentEvent() {
  const { event, setEvent } = useSubscribeSystem();

  return (
    <Box
      height="fit-content"
      borderRadius="xl"
      border="0.0625rem solid"
      borderColor="shader.a.800"
      bg="shader.a.900"
      width="full"
      color="white"
      fontWeight="medium"
    >
      <HStack
        justifyContent="space-between"
        padding={6}
        borderBottom="0.0625rem solid"
        borderColor="shader.a.800"
      >
        <Text>Recent events</Text>

        <Button
          variant="unstyled"
          color="primary.a.400"
          fontSize="sm"
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
                  <Text>
                    {formatDistanceToNowStrict(timestamp, { addSuffix: true })}
                    &nbsp;
                    {eventName}
                  </Text>

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
}
