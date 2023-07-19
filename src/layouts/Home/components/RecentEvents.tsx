import React, { useState, useEffect } from 'react';
import { Box, HStack, Heading, Text } from '@chakra-ui/react';
import { useAppSelector } from 'hooks/useRedux';
import { VoidFn } from '@polkadot/api/types';
const FILTERED_EVENTS = [
  'system:ExtrinsicSuccess::(phase={"applyExtrinsic":0})',
];

interface IEvent {
  key: number;
  summary: string;
  content: string;
}
const RecentEvents = () => {
  const { api } = useAppSelector(state => state.substrate);
  const [eventFeed, setEventFeed] = useState<Array<IEvent>>();
  useEffect(() => {
    let unsub: VoidFn | undefined;
    let keyNum = 0;
    const allEvents = async () => {
      unsub = await api?.query.system.events(events => {
        // loop through the  Vec<FrameSystemEventRecord>
        events.forEach(record => {
          // extract the phase, event and the event types
          const { event, phase } = record;

          // show what we are busy with
          const evName = `${event.section}:${event.method}`;
          const evParams = event.data.toString();
          const evNamePhase = `${evName}::(phase=${phase.toString()})`;

          if (FILTERED_EVENTS.includes(evNamePhase)) return;

          setEventFeed(preEvents => [
            {
              key: keyNum,
              summary: evName,
              content: evParams,
            } as IEvent,
            ...(preEvents || []),
          ]);

          keyNum += 1;
        });
      });
    };

    allEvents();
    return () => unsub && unsub();
  }, [api?.query.system]);
  console.log(eventFeed);
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
      <Box height="400px">
        {React.Children.toArray(
          eventFeed?.map(event => (
            <Box>
              <Heading size="sm">{event.summary}</Heading>
              <Text noOfLines={2} wordBreak="break-word">
                {event.content}
              </Text>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default RecentEvents;
