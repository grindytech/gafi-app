import {
  VStack,
  Text,
  HStack,
  Box,
  Image,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { mdiEraser } from '@mdi/js';
import { t } from 'i18next';
import React, { useState, useEffect } from 'react';

import Card from 'components/card/Card';
import { useSubstrateState } from 'substrate-lib';

const FILTERED_EVENTS = [
  'system:ExtrinsicSuccess::(phase={"applyExtrinsic":0})',
];

const eventName = (ev: any) => `${ev.section}:${ev.method}`;
const eventParams = (ev: any) => JSON.stringify(ev.data);

interface IEvent {
  key: number;
  summary: string;
  content: string;
}

const EventInfo = () => {
  const { api } = useSubstrateState();
  const [eventFeed, setEventFeed] = useState<Array<IEvent>>();

  useEffect(() => {
    let unsub: any;
    let keyNum = 0;
    const allEvents = async () => {
      unsub = await api?.query.system.events(events => {
        // loop through the Vec<EventRecord>
        events.forEach(record => {
          // extract the phase, event and the event types
          const { event, phase } = record;

          // show what we are busy with
          const evHuman = event.toHuman();
          const evName = eventName(evHuman);
          const evParams = eventParams(evHuman);
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

  return (
    <Card flex={4}>
      <VStack alignItems="flex-start">
        <HStack
          justifyContent="space-between"
          w="full"
          mb={8}
          alignItems="center"
        >
          <Text color="primary">&bull; {t('RECENT_EVENTS')}</Text>
          <IconButton
            w={10}
            h={10}
            aria-label="Search database"
            onClick={_ => setEventFeed([])}
            bg="primary"
            icon={
              <Icon w={18} h={18}>
                <path fill="currentColor" d={mdiEraser} />
              </Icon>
            }
          />
        </HStack>
        {React.Children.toArray(
          eventFeed?.map((event, index: number) => (
            <HStack
              gap={2}
              borderTop={index === 0 ? '' : '1px solid #EEF1FF'}
              w="full"
              py={4}
            >
              <Box minW={10} mr={4} bg="greyBg" borderRadius="50%" p={2}>
                <Image
                  src="/assets/layout/notification.svg"
                  alt="notification"
                />
              </Box>
              <VStack flex={8} alignItems="flex-start">
                <Text fontWeight="bold">{event.summary}</Text>
                <Text w="90%">{event.content}</Text>
              </VStack>
            </HStack>
          ))
        )}
      </VStack>
    </Card>
  );
};

export default EventInfo;
