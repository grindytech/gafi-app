import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  useMediaQuery,
  useTheme,
} from '@chakra-ui/react';
import { mdiTrashCanOutline } from '@mdi/js';
import { VoidFn } from '@polkadot/api/types';
import { AnyJson } from '@polkadot/types/types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Card from 'components/card/Card';
import { useSubstrateState } from 'contexts/substrateContext';

const FILTERED_EVENTS = [
  'system:ExtrinsicSuccess::(phase={"applyExtrinsic":0})',
];

const eventName = (ev: Record<string, AnyJson>) => `${ev.section}:${ev.method}`;
const eventParams = (ev: Record<string, AnyJson>) => JSON.stringify(ev.data);

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
  const [isSmallScreen] = useMediaQuery(
    '(min-width: 1024px) and (max-width: 1271px)'
  );

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
    <Card>
      <HStack
        justifyContent="space-between"
        w="full"
        mb={8}
        alignItems="center"
      >
        <Text fontWeight={{ base: 'bold', tablet: 'normal' }} color="primary">
          &bull; {t('RECENT_EVENTS')}
        </Text>
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
      {React.Children.toArray(
        eventFeed?.map((event, index: number) => (
          <HStack
            borderTop={
              index === 0 ? 'none' : `1px solid ${theme.colors.borderBottom}`
            }
            py={4}
            alignItems="flex-start"
          >
            <Center
              bg="greyBg"
              borderRadius="50%"
              w={12}
              h={12}
              mr={{ base: 2, tablet: 4 }}
            >
              <Image src="/assets/layout/notification.svg" alt="notification" />
            </Center>
            <Box
              w={isSmallScreen ? '12.5rem' : { base: '12.5rem', tablet: '70%' }}
            >
              <Text fontWeight="bold">{event.summary}</Text>
              {event.content}
            </Box>
          </HStack>
        ))
      )}
    </Card>
  );
};

export default EventInfo;
