import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  StackDivider,
  Text,
  useTheme,
  useToken,
  VStack,
} from '@chakra-ui/react';
import { mdiTrashCanOutline } from '@mdi/js';
import { VoidFn } from '@polkadot/api/types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Card from 'components/card/Card';
import { useSubstrateState } from 'contexts/substrateContext';

const FILTERED_EVENTS = [
  'system:ExtrinsicSuccess::(phase={"applyExtrinsic":0})',
];

interface IEvent {
  key: number;
  summary: string;
  content: string;
}

const EventInfo = () => {
  const { api } = useSubstrateState();
  const [eventFeed, setEventFeed] = useState<Array<IEvent>>();
  const theme = useTheme();
  const { t } = useTranslation();
  const borderBottom = useToken('colors', 'borderBottom');

  useEffect(() => {
    let unsub: VoidFn | undefined;
    let keyNum = 0;
    const allEvents = async () => {
      unsub = await api?.query.system.events(events => {
        // loop through the Vec<EventRecord>
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

  return (
    <Card p={0}>
      <HStack
        justifyContent="space-between"
        w="full"
        p={6}
        alignItems="center"
        borderBottom={`1px solid ${borderBottom}`}
      >
        <Heading size="sm">{t('RECENT_EVENTS')}</Heading>

        <IconButton
          w={10}
          h={10}
          aria-label="reset-events"
          onClick={() => setEventFeed([])}
          bg="primary"
          icon={
            <Icon w={18} h={18}>
              <path fill="currentColor" d={mdiTrashCanOutline} />
            </Icon>
          }
        />
      </HStack>
      <VStack
        p={6}
        alignItems="flex-start"
        divider={
          <StackDivider
            borderColor={`1px solid ${theme.colors.borderBottom}`}
          />
        }
      >
        {React.Children.toArray(
          eventFeed?.map(event => (
            <Flex alignItems="center" py={4}>
              <Center
                bg="greyBg"
                borderRadius="50%"
                w={{ sm: 10, md: 12, lg: 10, xl: 12 }}
                h={{ sm: 10, md: 12, lg: 10, xl: 12 }}
                mr={{ base: 4, md: 8 }}
              >
                <Image
                  src="/assets/layout/notification.svg"
                  alt="notification"
                />
              </Center>
              <Box w={{ sm: '10.5rem', md: '70%', lg: '12.5rem', xl: '90%' }}>
                <Heading size="sm">{event.summary}</Heading>
                <Text noOfLines={2} wordBreak="break-word">
                  {event.content}
                </Text>
              </Box>
            </Flex>
          ))
        )}
      </VStack>
    </Card>
  );
};

export default EventInfo;
